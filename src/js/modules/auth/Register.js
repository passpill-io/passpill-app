import { h } from 'preact';
import freezer from 'state/freezer';
import utils from 'utils/utils';

import Form from 'modules/common/Form';
import Toaster from 'modules/common/Toaster';

export default class Register extends Form {
	constructor(){
		super();
		this.state = {
			username: '',
			pass: '',
			confirm: '',
			userDuty: false,
			terms: false
		};
	}

	render() {
		return (
			<div className="screen registerScreen">
				<h2><i className="fa fa-balance-scale" />Register</h2>
				<div className="loginForm">
					{this.renderInputGroup('text', 'username', { label: 'Username' })}
					{this.renderInputGroup('password', 'pass', { label: 'Pass phrase' })}
					{this.renderInputGroup('password', 'confirm', { label: 'Confirm pass phrase' })}
					{this.renderInputGroup('checkbox', 'userDuty', { label: "I understand that PPills can't recover my password." })}
					{this.renderInputGroup('checkbox', 'terms', { label: "I accept PPils terms and conditions" })}
					<button onClick={ () => this.register() }>Register</button>
				</div>
			</div>
		);
	}

	register() {
		if( !this.state.username || ! this.state.pass ) return;

		freezer.emit('pill:create', this.state.username, this.state.pass )
			.catch( err => {
				if( utils.isError( err, 400, 'vault_already_exist' ) ){
					Toaster.show('Sorry, the username already exist.', 'error', 0);
				}
			})
		;
	}
}
