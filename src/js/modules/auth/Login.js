import React from 'react';
import Link from 'urlhub/Link';
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
				<div className="loginContainer">
					<div className="alert yellow">
						<p>This app is in an <strong>alpha stage</strong>.</p>
						<p>You need to <Link to="/settings">connect it to your own server</Link> in order to work.</p>
					</div>
				</div>
				<div className="loginContainer">
					<div className="loginLeft">
						<h2>Get your pill</h2>
						<p>All your passwords will come back to your mind.</p>
						<p class="small">Don't you have<br/>your own password pill?<br/><Link to="/register">Get one for free</Link></p>
					</div>
					<div className="loginForm loginRight">
						{ this.renderInputGroup('text', 'username', {label: 'Pill name'} ) }
						{ this.renderInputGroup('password', 'pass', {label: 'Pass phrase'}) }
						<LoadingButton loading={ freezer.get().appStatus === 'LOGIN' } onClick={ () => this.login() } >Log in</LoadingButton>
					</div>
				</div>
			</div>
		);
	}

	login(){
		freezer.emit('pill:load', this.state.username, this.state.pass);
	}
}
