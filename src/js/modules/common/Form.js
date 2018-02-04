import React from 'react';

/**
 * The form component makes easy to create forms with validation and error handling.
 *
 * The workflow would be the following:
 *
 * 1. extends the form component *
 * class MyComponent extends Form({ ... })
 *
 * 2. Use the `renderInputGroup` method to create fields
 * render() {
 * 	return this.renderInputGroup('text', 'myField');
 * }
 * when the user update the field the value will be stored in this.state.myField
 *
 * 3. For validation, the component should implement the getErrors(values) method,
 * that should store the error message in `this.state.errors` object.
 * getErrors( values ){
 * 	if( !values[field] ){
 * 		this.setState({errors: {field: 'The field cannot be false'}})
 * 	}
 * }
 *
 * 4. before submiting the form the `validates` method can be used to call our
 * `getErrors` methods and will return true if there wasn't any error generated
 * if( this.validates() ){ submit() };
 * The `validates` method will also display the error messages in the form.
 *
 * 5. There are some methods like `this.checkOk` or `this.isChecked` that help validating
 * fields.
 *
 * 6. It is possible to add extra errors calculated externally using the `addErrors`
 * method that will merge the errors passed to the current ones.
 *
 */

export default class Form extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.inputUpdate = Form.prototype.inputUpdate.bind(this);
	}

	inputUpdate(e, clbk) {
		var name = e.target.name;
		if (!name)
			return;

		var update = {},
			value = e.target.value
			;

		if (e.target.type === 'checkbox')
			value = e.target.checked;

		update[name] = value;
		this.setState(update, clbk);
	}

	/**
	 * Render a group of label + input + error message.
	 *
	 * @param  {string} type       The type of the input as accepted by renderInput. text|radio|password...
	 * @param  {string} name       The name for the input. Needed to set the value in the state.
	 * @param  {object} options    =             {} Options for the group. label|error|attrs|className
	 * @param  {[type]} inputAttrs =             {} [description]
	 *
	 * return {[type]}            [description]
	 */
	renderInputGroup(type, name, options = {}, inputAttrs = {}) {

		if (type === 'checkbox') {
			return this.renderCheck(name, options, inputAttrs);
		}

		var className = "inputGroup";
		if (options.className)
			className += ' ' + options.className;


		var preLabel, postLabel;
		if (options.label) {
			preLabel = <label htmlFor={name}>{options.label}</label>;
			if (type === 'checkbox') {
				postLabel = preLabel;
				preLabel = '';
			}
		}

		var input, error;
		if (this.state.errors && this.state.errors[name]) {
			className += ' inputError';
			error = this.state.errors[name];
		}
		if (error) {
			error = <span className="errorMessage"><span className="exclamation">!</span>{error}</span>;
		}

		switch (type) {
			case 'select':
				input = this.renderSelect(name, inputAttrs);
				break;
			case 'textarea':
				input = this.renderTextarea(name, inputAttrs);
				break;
			case 'toggle':
				input = this.renderToggle(name, options, inputAttrs);
				break;
			case 'checkbox':
				input = this.renderCheck(name, options, inputAttrs);
				break;
			case 'radio':
				input = this.renderRadio(name, inputAttrs, true);
				break;
			case 'time':
				input = this.renderTimeInput(name, inputAttrs);
				break;
			default:
				input = this.renderInput(type, name, inputAttrs);
		}

		return (
			<div className={className} { ...(options.attrs || {}) }>
				{preLabel} {input} {postLabel} {error}
			</div>
		)
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
				onChange={attrs.onChange || this.inputUpdate.bind(this)}
				value={attrs.value || this.state[name]}
				{ ...selectAttrs }>
				{options}
			</select>
		)
	}

	renderInput(type, name, attrs) {
		if (!attrs)
			attrs = {};

		if (type === 'radio' || type === 'fancyRadioButton')
			return this.renderRadio(name, attrs, type === 'fancyRadioButton');

		return <input type={type || 'text'}
			name={name}
			value={attrs.value || this.state[name]}
			onChange={attrs.onChange || this.inputUpdate.bind(this)}
			{ ...attrs } />;
	}

	renderTextarea(name, attrs) {
		if (!attrs)
			attrs = {};

		return <textarea
			name={name}
			value={attrs.value || this.state[name]}
			onChange={attrs.onChange || this.inputUpdate.bind(this)}
			onKeyDown={e => this.onKeyDown(e)}
			{...attrs} />
	}

	renderRadio(name, attrs, isFancy) {
		var props = assign({}, attrs),
			options = attrs.options || {},
			selectedValue = attrs.value || this.state[name],
			className = '',
			fancyDiv
			;

		delete props.options;

		if (isFancy) {
			className = 'fancyRadio';
			fancyDiv = <span className="fancyDiv"></span>;
		}


		return Object.keys(options).map(op => {
			var checked = selectedValue === op,
				labelClass = className
				;

			if (checked) {
				labelClass += ' checkOn';
			}
			return (
				<label key={op} className={labelClass}>
					<input {...props} type="radio" checked={selectedValue === op} name={name} value={op} onChange={e => this.updateRadio(e, attrs)} />
					{fancyDiv} {options[op]}
				</label>
			);
		});
	}

	renderToggle(name, options, attrs) {
		var className = 'toggle ' + (attrs.className || ""),
			value = attrs.value !== undefined ? attrs.value : this.state[name]
			;

		if (value) {
			className += " toggleOn";
		}
		if (options.loading) {
			className += " toggleLoading";
		}

		return (
			<button className={className} onClick={() => attrs.onClick ? attrs.onClick(!value) : this.updateToggle(name, !value, attrs)}></button>
		);
	}

	renderCheck(name, options, attrs) {
		var className = 'inputGroup checkbox fancyCheckbox ' + (options.className || ""),
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
				<span className="fancyDiv"></span>
				<input name={name} type="checkbox" onChange={attrs.onChange || this.inputUpdate.bind(this)} />
				<span>{options.label}</span>
			</label>
		);
	}


	renderTimeInput(name, inputAttrs) {
		if (!this.timers) this.timers = {};

		var me = this;
		var value = inputAttrs.value || this.state[name] ||  '';

		var onChange = function (e) {
			var update = {},
				value = e.target.value
				;

			update[name] = value;
			if (inputAttrs.onChange) {
				inputAttrs.onChange(e)
			}
			else {
				me.setState(update);
			}

			if (me.timers[name]) {
				clearTimeout(me.timers[name]);
			}

			me.timers[name] = setTimeout(() => {
				me.timers[name] = false;

				var e = {
					target: {
						name: name,
						value: me.parseTime(value)
					}
				};

				if (inputAttrs.onChange) {
					inputAttrs.onChange(e)
				}
				else {
					me.inputUpdate(e);
				}

			}, 1000);
		};

		// Closure to cache the value
		return (function (name, inputAttrs) {
			var attrs = assign({}, inputAttrs, {
				onChange: onChange,
				name: name,
				value: me.timers[name] ? value : me.formatTime(value)
			});

			return <input type="text" {...attrs} />;
		})(name, inputAttrs);
	}

	parseTime(value) {
		var match = value.match(/(\d{1,2})(:\d{1,2})?\s*([ap]m)?/i);

		if (!match) return value;

		var hours = parseInt(match[1]),
			minutes = parseInt(match[2]) || 0,
			modifier = match[3] || 'am',
			val
			;

		if (modifier.toLowerCase() === 'pm') {
			hours += 12
		}

		if (hours > 23) {
			hours = 23;
		}
		if (minutes > 59) {
			minutes = 59;
		}

		val = this.padTime(hours) + ':' + this.padTime(minutes);

		return val;
	}

	padTime(time) {
		if (time < 10) {
			return '0' + time;
		}
		return time;
	}

	formatTime(time) {
		var value = time;

		/* Eventually handling AM/PM time
    if( SingleStore.state.country === 'US' ){
      var m = moment.utc( time, 'H:mm' );
      if( m.isValid() ){
        value = m.format('hh:mm A');
      }
    }
		*/

		return value;
	}

	updateRadio(e, attrs) {
		if (attrs.onChange) {
			attrs.onChange(e.target.value);
		}
		else {
			this.inputUpdate(e);
		}
	}

	updateToggle(name, value, attrs) {
		if (attrs.onChange) {
			attrs.onChange(value);
		}
		else {
			var update = {};
			update[name] = value;
			this.setState(update);
		}
	}

	textInput(name, attrs) {
		return this.renderInput('text', name, attrs);
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

	onKeyDown(e) {
		if ([37, 38, 39, 40].indexOf(e.which) !== -1) {
			e.stopPropagation();
		}
	}

	/**
	 * Check field errors calling child `getErrors` methods and
	 * set them in the errors object in the state.
	 *
	 * `errors` objects are in the form {fieldName: message}
	 *
	 * @return {boolean} Whether the form is valid
	 */
	validates() {
		this.errors = {};
		this.getErrors && this.getErrors(this.state);
		this.setState({ errors: this.errors });
		return (!Object.keys(this.errors).length);
	}

	// Validation methods

	/**
	 * Checks if a condition is truthy
	 * @param  {any}  condition The condition to Check
	 * @param  {string}  field     The name of the field to hold the error
	 * @param  {string}  message   Error message to be shown.
	 */
	checkOk(condition, field, message) {
		if (!condition)
			this.errors[field] = message || __('This value is not valid.');
	}

	checkChecked(field, message) {
		this.checkOk(this.state[field] === true, field, message);
	}

	checkEmail(field, message) {
		if (!this.state[field].match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)) {
			this.errors[field] = message || __('The email address is not valid.');
		}
	}

	/**
	 * Adds errors to the existing ones in the form.
	 * `errors` object is in the form {fieldName: message}
	 *
	 * @param {[type]} newErrors [description]
	 */
	addErrors(newErrors) {
		this.setState({ errors: assign({}, this.state.errors, newErrors) });
	}
}
