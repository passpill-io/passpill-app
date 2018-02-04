import React from 'react';
import Form from 'modules/common/Form';
import LoadingButton from 'modules/common/LoadingButton';
import freezer from 'state/freezer';

export default class Login extends Form {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		};
	}

	render() {
		return (
			<div className="screen loginScreen">
				<h2>Get your pill</h2>
				<div className="loginForm">
					{ this.renderInputGroup('text', 'username', {label: 'Username'} ) }
					{ this.renderInputGroup('password', 'pass', {label: 'Pass phrase'}) }
					<LoadingButton loading={ freezer.get().appStatus === 'LOGIN' } onClick={ () => this.login() } >Log in</LoadingButton>
				</div>
			</div>
		);
	}

	login(){
		freezer.emit('pill:load', this.state.username, this.state.pass);
	}
}
