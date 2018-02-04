import React from 'react';
import freezer from 'state/freezer';
import router from 'state/router';
import PillMenu from './PillMenu';
import PassList from './PassList';
import PassEdit from './PassEdit';


export default class PillViewer extends React.Component {
	constructor(){
		super();
		this.currentQuery = router.location.query;
		this.state = {
			editing: false,
			editPass: {name: ''}
		};
	}

	render(){
		let store = freezer.get();

		return (
			<div className={ this.getClassName() }>
				<div className="pwSelector">
					<div className="pwSidebar">
						<PillMenu />
					</div>
					<div className="pwContent">
						<PassList passes={ store.passes } order={ store.passOrder } onCreate={ () => freezer.emit('pass:create') } onEdit={ id => freezer.emit('pass:edit', id) } />
					</div>
				</div>
				<div className="pwEdit">
					<PassEdit pass={ freezer.get().editPass } onSave={ () => freezer.emit('pass:save') } />
				</div>
			</div>
		);
	}

	getClassName(){
		var className = 'pillViewer',
			pathname = router.location.pathname
		;

		if( pathname === '/createPass' || pathname === '/editPass' ){
			className += ' editPass';
		}

		return className
	}

	edit( id ){

		var pass = freezer.get().passes[id];
		if( !pass ) return;
		freezer.get().set({ editPass: pass.toJS() });
		router.push('/editPass');
	}

}
