import freezer from 'state/freezer';
import Ajax from 'utils/Ajax';
import Crypto from 'utils/Crypto';
import errorHandler from 'utils/errorHandler';


function st(){ return freezer.get() };

st().set({
	appStatus: 'OK', // 'INIT', 'LOGIN', 'LOGOUT', 'OK'
	saveStatus: 'OK', // 'OK', 'ENCODE', 'SAVE'
	syncStatus: 'OK', // 'OK', 'LOCAL'
	auth: false, // {username, u, p, k}
	passes: false,
	passOrder: [],
	search: { query: '' }
});


freezer.on('pill:create', (user, pass) => {
	st().set({ appStatus: 'ENCRYPTING' });

	let credentials = Crypto.hashCredentials(user, pass),
		pillData = { passes: [] }
	;

	return Crypto.createPill( pillData, pass )
		.then( result => {
			// Set credentials
			st().set({ auth:{
				u: credentials.u,
				p: credentials.p,
				k: result.key
			}});

			// Save
			st().set({ appStatus: 'SAVING' });
			return Ajax.post('/createPill', {
				u: credentials.u,
				p: credentials.p,
				v: pill
			});
		})
		.then( pill => freezer.emit('pill:receive', pill ) )
		.catch( err => {
			st().set({appStatus: 'OK'});
			errorHandler(err);
		})
	;
});

freezer.on('pill:load', (user, pass) => {
	let credentials = Crypto.hashCredentials( user, pass );
	st().set({appStatus: 'LOADING'});

	Ajax.post('/getPill', credentials)
		.then( pill => {
			// Set credentials and the key afterwards
			st().set({ auth:{
				u: credentials.u,
				p: credentials.p
			}});
			st().set({appStatus: 'DECRYPTING'});
			return freezer.emit('pill:receive', pill, pass);
		})
		.catch( err => {
			st().set({appStatus: 'OK'});
			errorHandler(err);
		})
	;
});

freezer.on('pill:receive', (pill, pass) => {
	var decryptMethod = pass ? 'decryptPill' : 'decryptPillWithKey',
		key = pass || st().auth.k
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
			st().auth.set({k: result.key});

			// All the pill data
			st().set({
				appStatus: 'OK',
				pillData,
				passes,
				passOrder
			});
		})
	;
});

freezer.on('pill:save', () => {
	var state = st(),
		passes = state.passOrder.map( passId => state.passes[passId] ),
		payload = {
			u: state.auth.u,
			p: state.auth.p,
			v: Crypto.encryptPill({passes}, state.auth.k)
		}
	;

	st().set({ appStatus: 'SAVING' });
	return Ajax.post('/updatePill', payload )
		.then( pill => freezer.emit('pill:receive', pill) )
	;
});

freezer.on('pill:delete', pass => {
	console.log('TODO pill:delete');
});


let normalizePillData = function( pillData ){
	var normalized = Object.assign({}, pillData);
	if( !normalized.passes ){
		normalized.passes = [];
	}
	return normalized;
}
