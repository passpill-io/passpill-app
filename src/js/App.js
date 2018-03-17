import React from 'react';
import Header from 'modules/common/Header';
import Toaster from 'modules/common/Toaster';
import LoadingLayer from 'modules/common/LoadingLayer';

import router from 'state/router';
import store from 'state/store';

class App extends React.Component {
	constructor(props) {
		super(props);

		let location = router.start();
		this.currentLocation = location.pathname + location.search;
		this.state = {
			component: this.getComponent()
		};
	}

	render() {
		let Component = this.state.component;
		return (
			<div id="app">
				<Header />
				<Component />
				<Toaster />
				<LoadingLayer status={ store.appStatus } />
			</div>
		);
	}

	getComponent(){
		let next = router.location.pathname + router.location.search,
			auth = !!store.pillData,
			component = router.location.matches[0]
		;

		// Never get into the root route
		if( router.location.pathname === '/' ){
			next = '/login';
		}

		// Don't allow to get into auth or open routes
		// depending if the user is authenticated
		if( !auth && router.authOnly.has(next) ){
			next = '/login';
		}
		else if( auth && router.openOnly.has(next) ){
			next = '/mypill';
		}

		// If the next location is not the current one
		// calculate the next component
		if( next !== this.currentLocation ){
			this.currentLocation = next;
			router.replace( next );
			component = router.match( next ).matches[0];
		}


		return component;
	}

	update(){
		let component = this.getComponent();
		if( component !== this.state.component ){
			this.setState({component});
		}
		else {
			this.forceUpdate();
		}
	}

	componentDidMount(){
		store.on('state', () => this.update() );
		router.onChange( () => this.update() );
	}
}

export default <App />;
