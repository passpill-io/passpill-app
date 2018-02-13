import React, { Component } from 'react';

class LoadingLayer extends Component {

	constructor(){
		super();
		this.state = {
			visible: false,
			status: 'LOADING'
		}
	}

	statusMessages = {
		LOADING: 'Loading',
		SAVING: 'Saving',
		ENCRYPTING: 'Encrypting',
		DECRYPTING: 'Decrtypting'
	}

	render() {
		var status = this.props.status,
			message = '',
			className = 'loadingLayer'
		;

		if( this.state.visible ){
			className += ' visible';
		}
		if( this.props.status === 'OK' ){
			className += ' statusOk';
		}

		return (
			<div className={ className }>
				<div className="llContainer">
					<p><i className="fa fa-cog"></i></p>
					<p>{ this.statusMessages[ this.state.status ] }</p>
				</div>
			</div>
		);
	}

	componentWillReceiveProps(nextProps){
		if( nextProps.status !== this.state.status && nextProps.status !== 'OK'){
			this.setState({status: nextProps.status});
		}

		if( nextProps.status !== 'OK' && !this.state.visible ){
			this.setState({visible: true});
			clearTimeout( this.timer );
		}
		if( nextProps.status === 'OK' && this.state.visible ){
			this.timer = setTimeout( () => {
				this.setState({visible:false});
			},300);
		}
	}
}

export default LoadingLayer;
