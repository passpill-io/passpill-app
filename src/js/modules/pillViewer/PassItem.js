import React from 'react';


export default class PassItem extends React.Component {
	render(){
		let pass = this.props.pass;
		return (
			<div className="pass shortbox card" onClick={ e => this.edit( e, pass.id ) }>
				<div className="passName">{ pass.name }</div>
				{ this.renderFields( pass.fields ) }
				<div className="controls passControls">
					<i className="fa fa-chevron-right"></i>
				</div>
			</div>
		);
	}

	renderFields( fields ){
		var list = [];
		fields.forEach( f => {
			if( !f.listed ) return;

			var value = f.hidden ? '******' : f.value;
			if( f.value.match(/https?:\/\//) ){
				list.push(
					<div className="passField passUrlField">
						<span className="passFieldName">{ f.name }: </span>
						<span className="passFieldValue"><a href={value} target="_blank" onClick={ e => e.preventDefault() }>{ this.getDomain(value) } <i className="fa fa-external-link-square-alt"></i></a></span>
					</div>
				);
			}
			else {
				list.push(
					<div className="passField passCopyField" key={ f.name }>
						<span className="passFieldName">{ f.name }: </span>
						<span className="passFieldValue" onClick={ e => this.copy(e,value) }>{ value.slice(0,30) }{ value.length > 30 ? '...' : ''} <i className="fa fa-clipboard"></i></span>
					</div>
				);
			}
		})

		return (
			<div className="passFields">
				{ list }
			</div>
		);
	}

	getDomain( url ){
		var parts = url.match(/https?:\/\/([^\/]*)/);
		return parts ? parts[1] : url;
	}

	edit( e, id ){
		if( e.defaultPrevented ) return;
		this.props.onEdit( id );
	}

	copy( e, value ){
		e.preventDefault();
		console.log('Copying');
	}
}
