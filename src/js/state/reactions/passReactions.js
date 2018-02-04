import freezer from 'state/freezer';
import router from 'state/router';

function st(){ return freezer.get() };

st().set({
	editPass: false
});


freezer.on('pass:create', pass => {
	var editPass = {
		id: 'new',
		name: 'New pass',
		fields: [
			{ name: 'User name', value: 'nicestar99', hidden: false },
			{ name: 'Password', value: 'myTopSecretPass33', hidden: true}
		]
	};

	freezer.get().set({editPass});

	router.push('/createPass');
});

freezer.on('pass:edit', passId => {
	var pass = freezer.get().passes[ passId ];
	if( !pass ) return;
	freezer.get().set({ editPass: pass.toJS() });
	router.push('/editPass');
});

freezer.on('pass:save', () => {
	var editPass = st().editPass;
	if( !editPass ) return;

	var pass = editPass.toJS();
	if( pass.id === 'new' ){
		// Pass creation
		pass.id = Date.now();
		st().passes.set( pass.id, pass );
		st().passOrder.push( pass.id );
	}
	else {
		st().passes.set( pass.id, pass );
	}
	freezer.emit('pill:save');
	router.back();
});

freezer.on('pass:delete', passId => {
	st().passes.remove(passId);
	var idx = st().passOrder.indexOf(passId);
	st().passOrder.splice(idx, 1);
	freezer.emit('pill:save');
});
