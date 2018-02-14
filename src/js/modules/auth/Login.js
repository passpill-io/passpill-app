import React from 'react';
import Link from 'urlhub/Link';
import Form from 'modules/common/Form';
import Toaster from 'modules/common/Toaster';
import freezer from 'state/freezer';

export default class Login extends Form {
	constructor() {
		super();
		this.state = {
			pillname: '',
			password: ''
		};

		var wrongLoginMsg = "There is no pill for that name and password";
		this.errorMessages = {
			unknown_pill: wrongLoginMsg,
			wrong_credentials: wrongLoginMsg
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
						{ this.renderField('text', 'pillname', {label: 'Pill name'} ) }
						{ this.renderField('password', 'pass', {label: 'Pass phrase'}) }
						<button onClick={ () => this.login() } >Log in</button>
					</div>
				</div>
			</div>
		);
	}

	login(){
		freezer.emit('pill:load', this.state.pillname, this.state.pass)
			.then( result => {
				if( result && result.error ){
					Toaster.show( this.errorMessages[ result.code ] );
				}
			})
		;
	}
}
