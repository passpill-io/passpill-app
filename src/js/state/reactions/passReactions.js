import store from 'state/store';
import router from 'state/router';

store.editPass = false;

window.appstate = store;

store.on('pass:create', pass => {
	var editPass = {
		id: 'new',
		name: 'New pass',
		fields: [
			{ name: 'User name', value: 'nicestar99', hidden: false },
			{ name: 'Password', value: 'myTopSecretPass33', hidden: true}
		]
	};

	store.editPass = editPass;

	router.push('/createPass');
});

store.on('pass:edit', passId => {
	var pass = store.passes[ passId ];
	if( !pass ) return;
	store.editPass = Object.assign({}, pass);
	router.push('/editPass');
});

store.on('pass:save', () => {
	var editPass = store.editPass;
	if( !editPass ) return;

	var pass = Object.assign({}, editPass);
	if( pass.id === 'new' ){
		// Pass creation
		pass.id = Date.now();
		store.passOrder.push( pass.id );
	}
	store.passes[pass.id] = pass;
	store.emit('pill:save');
	router.back();
});

store.on('pass:delete', passId => {
	delete store.passes[passId];

	var idx = store.passOrder.indexOf(passId);
	store.passOrder.splice(idx, 1);
	store.emit('pill:save');
});
