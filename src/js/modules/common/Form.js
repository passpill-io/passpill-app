import React from 'react';

/**
 * The form component updates the state automatically for its own inputs. To use:
 *
 * 1. extends the form component
 * class MyComponent extends Form({ ... })
 *
 * 2. Use the `renderField` method to create fields
 * render() {
 * 	return this.renderField( inputType, inputName, groupAttributes, inputAttributes );
 * }
 *
 * The Form component will update this.state.{inputName} when the input changes
 *
 */

export default class Form extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	/**
	 * Render a group of label + input
	 *
	 * @param  {string} type       The type of the input as accepted by renderInput. text|radio|password...
	 * @param  {string} name       The name for the input. Needed to set the value in the state.
	 * @param  {object} options    =             {} Options for the group. label|error|attrs|className
	 * @param  {[type]} inputAttrs =             {} [description]
	 *
	 * return {[type]}            [description]
	 */
	renderField(type, name, options = {}, inputAttrs = {}) {

		var className = "inputField";
		if ( options.className ){
			className += ' ' + options.className;
		}

		var label;
		if (options.label && type !== 'checkbox' ) {
			label = <label htmlFor={name}>{options.label}</label>;
		}

		var error;
		if (options.error) {
			className += ' inputError';
			error = <span className="errorMessage">{options.error}</span>;
		}

		var input;
		switch (type) {
			case 'select':
				input = this.renderSelect(name, inputAttrs);
				break;
			case 'textarea':
				input = this.renderTextarea(name, inputAttrs);
				break;
			case 'checkbox':
				input = this.renderCheck(name, options, inputAttrs);
				break;
			default:
				input = this.renderInput(type, name, inputAttrs);
		}

		return (
			<div className={className} { ...(options.attrs || {}) }>
				{label} {input} {error}
			</div>
		)
	}

	inputUpdate(e) {
		var t = e.target,
			name = t.name
		;

		if (!name) return;

		var update = {},
			value = t.type === 'checkbox' ? t.checked : t.value
		;

		update[name] = value;
		this.setState(update);
	}

	renderSelect(name, attrs) {
		var selectAttrs = assign({}, attrs),
			options
		;

		if (attrs.options.splice) { // array
			options = attrs.options.map(opt => <option key={opt} value={opt}>{opt}</option>);
		}
		else {
			options = Object.keys(attrs.options).map(val => (
				<option key={val} value={val}>{attrs.options[val]}</option>
			));
		}

		delete selectAttrs.options;
		delete selectAttrs.onChange;

		return (
			<select name={name}
				id={name}
				onChange={attrs.onChange || (e => this.inputUpdate(e)) }
				value={attrs.value || this.state[name]}
				{ ...selectAttrs }>
				{options}
			</select>
		);
	}

	renderTextarea(name, attrs) {
		if (!attrs)
			attrs = {};

		return <textarea
			name={name}
			value={attrs.value || this.state[name]}
			onChange={attrs.onChange || (e => this.inputUpdate(e)) }
			{...attrs} />
	}

	renderCheck(name, options, attrs) {
		var className = 'inputField checkbox coolCheckbox ' + (options.className || ""),
			value = attrs.value !== undefined ? attrs.value : this.state[name]
		;

		if (value) {
			className += " checkOn";
		}
		if (options.loading) {
			className += " checkLoading";
		}

		return (
			<label className={className}>
				<span className="coolDiv"></span>
				<input name={name} type="checkbox" onChange={attrs.onChange || (e => this.inputUpdate(e)) } />
				<span>{options.label}</span>
			</label>
		);
	}

	renderInput(type, name, attrs) {
		if (!attrs)
			attrs = {};

		return <input type={type || 'text'}
			name={name}
			value={attrs.value || this.state[name]}
			onChange={attrs.onChange || (e => this.inputUpdate(e)) }
			{ ...attrs } />;
	}

	getFormValue() {
		var value = {}, fields, errorIndex;
		if (this.getFormFields) {
			fields = this.getFormFields();
		}
		else {
			fields = Object.keys(this.state);
			errorIndex = fields.indexOf('errors');
			if (errorIndex !== -1)
				fields.splice(errorIndex, 1);
		}

		fields.forEach(field => {
			value[field] = this.state[field];
		});

		return value;
	}
}
