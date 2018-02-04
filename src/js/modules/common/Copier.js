import React, { Component } from 'react';
import copy from 'copy-to-clipboard';

var singleton, timer;
class Copier extends Component {
	static show( e, text, message ){
		copy(text);
		singleton.setState({
			showing: true,
			coords: {
				left: e.pageX - 50, top: e.pageY - 100
			},
			message
		});

		setTimeout( () => singleton.setState({showing: false}), 5000 );
	}
	constructor(){
		super();
		this.state = {
			showing: false,
			coords: {left: 0, top: 0},
			message: ''
		};
		singleton = this;
	}
	render() {
		return (
			<div stlye={ this.state.coords } class="copierTip">
				{ this.state.message }
			</div>
		);
	}

}

export default Copier;
