require('./reactions/pillReactions');
require('./reactions/passReactions');

/*
import freezer from './freezer';
import Ajax from 'utils/Ajax';
import Crypto from 'utils/Crypto';

function st(){
	return freezer.get();
}

freezer.on('auth:login', (user, pass) => {
	let state = st();
	if( state.appStatus !== 'OK' ) return;

	let credentials = Crypto.hashCredentials( user, pass );

	state.set({appStatus: 'LOGIN'});
	Ajax.post('/getVault', credentials)
		.then( pill => {
			credentials.username = user;
			credentials.pass = pass;
			endLogin( pill, credentials );
		})
		.catch( err => {
			st().set({appStatus: 'OK'});
			throw err;
		})
	;
});

freezer.on('auth:register', (user, pass) => {
	st().set({ appStatus: 'LOGIN' });

	let registerData = Crypto.hashCredentials(user, pass),
		pill = {
			pins: {}
		}
	;

	return Crypto.createPill( pass )
		.then( pill => registerData.v = pill )
		.then( () => Ajax.post('/createVault', registerData) )
		.then( pill => {
			registerData.username = user;
			registerData.pass = pass;
			endLogin( pill, registerData);
		})
		.catch( err => {
			st().set({appStatus: 'OK'});
			throw err;
		})
	;
});

freezer.on('pill:update', () => {
	var store = st();
	var pill = Crypto.encryptPill( store.pillData.toJS(), store.auth.k )

	return Ajax.post('/updateVault', {u: store.auth.u, p: store.auth.p, v: pill});
});

let endLogin = function( pill, auth ){
	Crypto.decryptPill( pill, auth.pass )
		.then( result => {
			var pillData = normalizePillData(result.pillData),
				pins = {},
				order = []
			;

			pillData.pins.forEach( p => {
				pins[ p.id ] = p;
				p.push( p.id );
			});

			st().set({
				appStatus: 'OK',
				auth: {
					username: auth.username,
					u: auth.u,
					p: auth.p,
					k: result.k
				},
				pillData,
				pins,
				order
			});
		})
	;
};

let normalizePillData = function( pillData ){
	var normalized = Object.assign({}, pillData);
	if( !normalized.pins ){
		normalized.pins = [];
	}
	return normalized;
}
*/
