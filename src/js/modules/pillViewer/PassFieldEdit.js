import React, { Component } from 'react';
import LineInput from 'modules/common/LineInput';
import AutoTextArea from 'modules/common/AutoTextArea';


class PassFieldEdit extends Component {
	render() {
		var field = this.props.field,
			eyeClass = 'fa fa-eye' + ( field.hidden ? '-slash' : '' ),
			listedClass = 'fa fa-' + ( field.listed ? 'list-alt' : 'square' ),
			input
		;

		return (
			<div className="passFieldEdit box shortbox card">
				<LineInput className="pfeName"
					value={ field.name }
					onChange={ e => field.name = e.target.value } />
				<div className="pfeValue">
					{ this.renderInput( field ) }
				</div>
				<div className="controls pfeControls">
					{ this.renderVisible(field) }
					{ this.renderListed(field) }
					<a><i className="fa fa-clipboard"></i> Copy</a>
				</div>
			</div>
		);
	}

	renderVisible( field ){
		var cn = 'fa fa-eye' + ( field.hidden ? '-slash' : '' ),
			text = field.hidden ? 'Protected' : 'Visible'
		;

		return (
			<a onClick={ e => field.hidden = !field.hidden }>
				<i className={ cn }></i> {text}
			</a>
		);
	}

	renderListed( field ){
		var cn = 'fa fa-' + ( field.listed ? 'list-alt' : 'square' ),
			text = field.listed ? 'Listed' : 'Not listed'
		;

		return (
			<a onClick={ e => field.listed = !field.listed }>
				<i className={ cn }></i> {text}
			</a>
		);

	}

	renderInput( field ){
		if( field.hidden ){
			return (
				<input type="password"
					value={ field.value }
					onChange={ e => (field.value = e.target.value) && this.forceUpdate() } />
			);
		}

		return (
			<AutoTextArea value={ field.value }
				onChange={ e => (field.value = e.target.value) && this.forceUpdate() } />
		);
	}

}

export default PassFieldEdit;
