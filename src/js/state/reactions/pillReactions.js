import store from 'state/store';
import Ajax from 'utils/Ajax';
import Crypto from 'utils/Crypto';
import errorHandler from 'utils/errorHandler';

Object.assign( store, {
	appStatus: 'OK', // 'INIT', 'LOGIN', 'LOGOUT', 'OK'
	saveStatus: 'OK', // 'OK', 'ENCODE', 'SAVE'
	syncStatus: 'OK', // 'OK', 'LOCAL'
	auth: false, // {username, u, p, k}
	passes: false,
	passOrder: [],
	search: { query: '' }
});

store.on('pill:create', (user, pass) => {
	store.appStatus = 'ENCRYPTING';

	var pillData = { passes: [] },
		credentials
	;

	return Crypto.hashCredentials(user, pass)
		.then( c => credentials = c )
		.then( () => Crypto.createPill( pillData, pass ) )
		.then( result => {
			// Set credentials
			store.auth = {
				u: credentials.u,
				p: credentials.p,
				k: result.key
			};

			// Save
			store.appStatus = 'SAVING';
			return Ajax.post('/createPill', {
				u: credentials.u,
				p: credentials.p,
				v: result.pill
			});
		})
		.then( pill => store.emit('pill:receive', pill ) )
		.catch( err => {
			store.appStatus = 'OK';
			return getErrorResult( err ) || errorHandler( err );
		})
	;
});

store.on('pill:load', (user, pass) => {
	var credentials;

	store.appStatus = 'LOADING';

	return Crypto.hashCredentials( user, pass )
		.then( c => credentials = c )
		.then( () => Ajax.post('/getPill', credentials) )
		.then( pill => {
			// Set credentials and the key afterwards
			store.auth = {
				u: credentials.u,
				p: credentials.p
			};
			store.appStatus = 'DECRYPTING';

			return store.emit('pill:receive', pill, pass);
		})
		.catch( err => {
			store.appStatus = 'OK';
			return getErrorResult( err ) || errorHandler( err );
		})
	;
});

store.on('pill:receive', (pill, pass) => {
	var decryptMethod = pass ? 'decryptPill' : 'decryptPillWithKey',
		key = pass || store.auth.k
	;

	return Crypto[decryptMethod]( pill, key )
		.then( result => {
			var pillData = normalizePillData(result.pillData),
				passes = {},
				passOrder = []
			;

			pillData.passes.forEach( p => {
				passes[ p.id ] = p;
				passOrder.push( p.id );
			});

			// Set the key
			store.auth.k = result.key;

			// All the pill data
			Object.assign(store, {
				appStatus: 'OK',
				pillData,
				passes,
				passOrder
			});
		})
	;
});

store.on('pill:save', () => {
	var passes = store.passOrder.map( passId => store.passes[passId] ),
		payload = {
			u: store.auth.u,
			p: store.auth.p,
			v: Crypto.encryptPill({passes}, store.auth.k)
		}
	;

	store.appStatus = 'SAVING';

	return Ajax.post('/updatePill', payload )
		.then( pill => store.emit('pill:receive', pill) )
	;
});

store.on('pill:delete', pass => {
	console.log('TODO pill:delete');
});


let normalizePillData = function( pillData ){
	var normalized = Object.assign({}, pillData);
	if( !normalized.passes ){
		normalized.passes = [];
	}
	return normalized;
}

let getErrorResult = function( err ){
	if( err && err.response && err.response.data && err.response.data.code ){
		return {error: true, code: err.response.data.code };
	}
}
