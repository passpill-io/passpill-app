import React from 'react';
import store from 'state/store';
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
		return (
			<div className={ this.getClassName() }>
				<div className="pwSelector">
					<div className="pwSidebar">
						<PillMenu search={ store.search } />
					</div>
					<div className="pwContent">
						<PassList passes={ store.passes } order={ store.passOrder } onCreate={ () => store.emit('pass:create') } onEdit={ id => store.emit('pass:edit', id) } />
					</div>
				</div>
				<div className="pwEdit">
					<PassEdit pass={ store.editPass } onSave={ () => store.emit('pass:save') } />
				</div>
			</div>
		);
	}

	getClassName(){
		var className = 'screen pillViewer',
			pathname = router.location.pathname
		;

		if( pathname === '/createPass' || pathname === '/editPass' ){
			className += ' editPass';
		}

		return className
	}

	edit( id ){
		var pass = store.passes[id];
		if( !pass ) return;

		store.editPass = Object.assign({}, pass);
		router.push('/editPass');
	}
}
