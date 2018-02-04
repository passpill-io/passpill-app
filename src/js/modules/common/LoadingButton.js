import React from 'react';
import assign from 'object-assign';

export default class LoadingButton extends React.Component {

	render(){
		let className = this.props.className || 'primary',
			content = this.props.children,
			props = assign({}, this.props),
			style = {}
		;

		delete props.onClick;
		delete props.loading;

		if( this.props.loading ){
			if( this.width ){
				style.width = this.width;
			}
			content = (
				<span className="loading">
					<i className="fa fa-sync" />
				</span>
			);
		}


		return <button ref={ button => this.button = button } type="button" style={ style } { ...props } onClick={ this.onClick.bind(this) } className={ className } >{ content }</button>;
	}

	onClick( e ){
		// If the button is loading do not handle clicks
		if( !this.props.loading )
			this.props.onClick( e );
	}

	componentWillUpdate( nextProps ){
		if( nextProps.loading && !this.props.loading )
			this.width = this.button.clientWidth;
	}
}
