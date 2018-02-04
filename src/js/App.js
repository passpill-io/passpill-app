import React from 'react';
import Header from 'modules/common/Header';
import Toaster from 'modules/common/Toaster';
import LoadingLayer from 'modules/common/LoadingLayer';

import router from 'state/router';
import freezer from 'state/freezer';

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
				<LoadingLayer status={ freezer.get().appStatus } />
			</div>
		);
	}

	getComponent(){
		let next = router.location.pathname + router.location.search,
			auth = !!freezer.get().pillData,
			component = router.location.matches[0]
		;

		if( router.location.pathname === '/' ){
			next = '/login';
		}

		if( !auth && !router.openRoutes[next] ){
			next = '/login';
		}
		else if( auth && router.openRoutes[next] ){
			next = '/mypill';
		}

		if( next !== this.currentLocation ){
			this.currentLocation = next;
			router.replace( next );
			component = router.match( next ).matches[0];
		}

		return component;
	}

	componentWillUpdate(){
		let component = this.getComponent();
		if( component !== this.state.component ){
			this.setState({component});
		}
	}

	componentDidMount(){
		freezer.on('update', () => this.forceUpdate());
		router.onChange( () => this.forceUpdate() );
	}
}

export default <App />;
