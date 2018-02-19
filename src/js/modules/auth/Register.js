import React from 'react';
import freezer from 'state/freezer';
import utils from 'utils/utils';

import Form from 'modules/common/Form';
import Toaster from 'modules/common/Toaster';
import Link from 'urlhub/Link';

export default class Register extends Form {
	constructor(){
		super();
		this.state = {
			pillname: '',
			pass: '',
			confirm: '',
			userDuty: false,
			terms: false
		};
	}

	render() {
		return (
			<div className="screen registerScreen">
				<div className="loginContainer">
					<div className="alert yellow">
						<p>This app is in an <strong>alpha stage</strong>.</p>
						<p>You need to <Link to="/settings">connect it to your own server</Link> in order to work.</p>
					</div>
				</div>
				<div className="loginContainer">
					<div className="loginLeft">
						<h2>Create your PassPill</h2>
						<p>In your own password pill you can store all your password securely and privately.</p>
						<p>Make sure you give your pill an unique name and select a long pass phrase that will be used to encrypt it.</p>
					</div>
					<Form className="loginForm loginRight">
						{this.renderField('text', 'pillname', { label: 'Pill name' })}
						{this.renderField('password', 'pass', { label: 'Pass phrase' })}
						{this.renderField('password', 'confirm', { label: 'Confirm pass phrase' })}
						{this.renderField('checkbox', 'userDuty', { label: "I understand that PassPill can't recover my password." })}
						{this.renderField('checkbox', 'terms', { label: "I accept PassPill terms and conditions" })}
						<button onClick={ () => this.register() }>Register</button>
					</Form>
				</div>
			</div>
		);
	}

	register() {
		if( !this.state.pillname || ! this.state.pass ) {
			Toaster.show('You need to write a pill name and a pass phrase.');
			return;
		}

		if( this.state.pass !== this.state.confirm ){
			Toaster.show("You pass phrase and the confirmation don't match.");
			return;
		}

		if( !this.state.userDuty ){
			Toaster.show("Please, understand that we won't be able to recover your pass phrase if you forget it and check the box.");
			return;
		}

		if( !this.state.terms ){
			Toaster.show("You need to accept the terms and conditions to create your pill.");
			return;
		}


		freezer.emit('pill:create', this.state.pillname, this.state.pass )
			.then( result => {
				if( result && result.error && result.code === 'pill_already_exist' ){
					Toaster.show('Sorry, the pillname already exist.');
				}

			})
		;
	}
}
