import React from 'react';
import Animate from 'rc-animate';

/**
 * The toaster is used to show notifications to the user.
 * There is a singleton object for the application 'Toaster'
 * that can show more than one toast at a time.
 *
 * To show a toast you need to use the method
 * show( contents, level, autoclose )
 * in the following way:
 *
 * import Toaster from 'Toaster';
 * Toaster.show( <div>No toaster!</div>, 'error', 5000 );
 *
 * contents: A string or React component with the message.
 * level: Toasts levels can be 'error', 'warn', 'info', 'success'. Default is 'error'
 * autoclose: Milliseconds to autoclose. If 0 no autoclosing.
 */

let ikey = 1, // keys for toast components
	timers = {}, // Timers for autoclosing by key
	toaster, // Ref to the loaded toaster
	liveNots
;

export default class Toaster extends React.Component {
	constructor() {
		super();

		this.state = {
			toasts: []
		};

		toaster = this;
		window.Toaster = Toaster;
	}

	static show(contents, level, autoclose, type, key) {
		let singleton = type === 'nots' ? liveNots : toaster,
			toast = {
				contents,
				level: level || 'error',
				key: key || ikey,
				closeOnClick: type === 'nots'
			},
			toasts = singleton.state.toasts.slice(0)
		;

		toasts.unshift(toast);
		singleton.setState({ toasts });

		if (typeof autoclose === 'undefined')
			autoclose = singleton.getDefaultAutoclose();

		if (autoclose)
			timers[toast.key] = setTimeout(() => {
				singleton.close(toast.key);
				delete timers[toast.key];
			}, autoclose)
		;

		ikey++;

		return toast.key;
	}

	static hide(key, type) {
		let singleton = type === 'nots' ? liveNots : toaster;
		singleton.close(key);
	}

	static currentToastCount(type) {
		let singleton = type === 'nots' ? liveNots : toaster;
		return singleton.state.toasts.length;
	}

	getDefaultAutoclose() {
		return 6000;
	}

	render() {
		let me = this,
			toasts = this.state.toasts.map(t => {
				return (
					<Toast key={t.key} level={t.level} onClose={me.onClose(t.key)} closeOnClick={t.closeOnClick} showIcon={this.props.className === 'toaster'} >
						{t.contents}
					</Toast>
				);
			})
		;

		let className = this.props.className || 'toaster';
		return (
			<div className={className}>
				<Animate transitionName={className + 'Trans'}>
					{toasts}
				</Animate>
			</div>
		);
	}

	onClose(toastKey) {
		let me = this;

		return () => {
			me.close(toastKey);
		};
	}

	close(toastKey) {
		if (!toastKey) {
			this.setState({ toasts: [] });
		}
		let index = this.findToast(toastKey),
			toasts = this.state.toasts.slice(0)
			;

		if (index !== false) {
			toasts.splice(index, 1);
			clearInterval(timers[toastKey]);
			delete timers[toastKey];

			this.setState({
				toasts
			});
		}
	}

	findToast(toastKey) {
		let found = false,
			i = 0,
			toasts = this.state.toasts
			;

		while (found === false && i < toasts.length) {
			if (toasts[i].key == toastKey) {
				found = i;
			}

			i++;
		}

		return found;
	}
}

let icons = {
	error: 'minus-circle',
	warn: 'exclamation-circle',
	success: 'check-circle'
};

export class Toast extends React.Component {
	render() {
		let level = this.props.level,
			className = 'toast toast-' + level
		;

		return (
			<div className={className} onClick={() => this.props.closeOnClick && this.props.onClose()}>
				<a className="toastClose" onClick={this.props.onClose}>
					<i className="fa fa-times" />
				</a>
				<div className="toastIcon">
					<i className={"fa fa-" + (icons[level] || 'pass')} />
				</div>
				<div className="toastContent">
					{this.props.children}
				</div>
			</div>
		);
	}
}
