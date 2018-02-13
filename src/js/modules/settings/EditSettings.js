import React from 'react';
import router from 'state/router';
import Form from 'modules/common/Form';
import Settings from 'utils/Settings';

class EditSettings extends Form {
	constructor(){
		super();

		this.keys = {
			apiUrl: Settings.API_URL
		};

		this.state = {
			updated: false
		};

		this.updateField
		Object.keys( this.keys ).forEach( key => {
			this.state[ key ] = Settings.get( this.keys[key] );
		});
	}

	render() {
		var cancelText = this.state.updated ? 'Cancel' : 'Close settings';
		return (
			<div className="screen settingsScreen">
				<h3><i className="fa fa-cog icon-circle"></i> Settings</h3>
				<div className="card box settingsBox">
					{ this.renderInputGroup( 'text', 'apiUrl', {label: 'API base URL:'}) }
					<div className="controls">
						<a className="shadowButton" onClick={ () => router.push('/login') }>{ cancelText }</a>
						<button onClick={ () => this.onSave() }>Save</button>
					</div>
				</div>
			</div>
		);
	}

	inputUpdate(e){
		// Call the parent method
		Form.prototype.inputUpdate.call( this, e );

		// Mark the form as updated
		this.setState({updated: true});
	}

	onSave(){
		for( let key in this.state ){
			Settings.set( this.keys[key], this.state[key] );
		}
		Toaster.show('Your settings have been saved.', 'green', 0);
		this.setState({updated: false});
	}


}

export default EditSettings;
