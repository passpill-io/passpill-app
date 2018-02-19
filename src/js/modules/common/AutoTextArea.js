import React, { Component } from 'react';

class AutoTextArea extends Component {
	constructor(){
		super();
		this.state = {
			height: 36
		};
	}

	render() {
		return (
			<textarea className="ata" ref={ el => this.textarea = el }
				style={{height:this.state.height}}
				onChange={ e => this.props.onChange(e) }
				value={ this.props.value } />
		);
	}

	calculateHeight(){
		if( !this.textarea ) return;
		let height = this.textarea.scrollHeight;
		if( height !== this.state.height ){
			this.setState({height});
		}
	}

	componentDidUpdate(){
		this.calculateHeight();
	}

	componentDidMount(){
		this.calculateHeight();
	}
}

export default AutoTextArea;
