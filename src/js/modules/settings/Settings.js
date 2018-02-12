import React, { Component } from 'react';
import LS from 'utils/LocalStorage';
import Form from 'modules/common/Form';

class Settings extends Form {
	constructor(){
		super();

		this.state = {
			apiUrl: LS.get('SERVER_URL') || 'http://localhost:3333/api'
		};
	}

	render() {
		return (
			<div className="screen settingsScreen">
				<h3><i className="fa fa-cog icon-circle"></i> Settings</h3>
				<div className="card box settingsBox">
					{ this.renderInputGroup( 'text', 'apiUrl', {label: 'API base URL:'}) }

					<div className="controls">
						<a className="shadowButton">Cancel</a>
						<button>Save</button>
					</div>
				</div>
			</div>
		);
	}




}

export default Settings;
