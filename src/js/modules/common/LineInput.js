import React, { Component } from 'react';

class LineInput extends Component {
	constructor( props ){
		super(props);

		this.id = Math.round(Math.random() * 100000);

		this.state = {
			focused: false
		};
	}
	render() {

		var cn = 'lineInput',
			id = this.props.id || this.id,
			label
		;

		if( this.props.className ){
			cn += ' ' + this.props.className;
		}
		if( this.state.focused ){
			cn += ' focused';
		}
		if( !this.props.value ){
			cn += ' empty';
		}

		if( this.props.label ){
			label = (
				<label htmlFor={ id }>{ this.props.label }</label>
			);
		}
		else {
			cn += ' nolabel';
		}

		return (
			<div className={ cn }>
				{ label }
				<input type="text" value={ this.props.value }
					id={ id }
					onChange={ e => this.props.onChange(e) }
					onFocus={ () => this.setState({focused: true})}
					onBlur={ () => this.setState({focused: false})} />
			</div>
		);
	}

}

export default LineInput;
