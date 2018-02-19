import React from 'react';
import router from 'state/router';
import LineInput from 'modules/common/LineInput';
import PassFieldEdit from './PassFieldEdit';


export default class PassEdit extends React.Component {
  render(){
    var pass = this.props.pass;

    if( !pass ) return;

    return (
      <div className="passEditor">
        <h3><i className="fa fa-id-card icon-circle"></i> { this.getTitle( pass ) }</h3>
				{ this.renderFields() }
      </div>
    );
  }

	renderFields(){
		var pass = this.props.pass;

		return (
			<form className="peBody" onSubmit={ e => e.preventDefault() } autoComplete="off">
				<LineInput value={ pass.name }
					className="big peName"
					onChange={ e => pass.set({name: e.target.value}) }
					label="Pass name" />
				<div className="peFields box">
					<h4 className="peFieldsTitle"><i className="fa fa-list-ul icon"></i> Fields</h4>
					{ pass.fields.map( f => <PassFieldEdit field={ f } /> ) }
          <button className="peFieldAdder" onClick={ () => this.addField() }>
            <i className="fa fa-plus-circle"></i> Add a field
          </button>
				</div>

				<div className="controls">
					<a onClick={ () => router.back() }>Cancel</a>
					<button onClick={ () => this.props.onSave() }>Save</button>
				</div>
			</form>
		);
	}

  getTitle( pass ){
    if( pass.id === 'new' ){
      return 'Create a pass';
    }
    return 'Edit pass';
  }

	update( field, value ){
		var updated = Object.assign({}, this.props.pass);
		updated[field] =  value;
		this.props.onChange( updated );
	}

	addField(){
		this.props.pass.fields.push(
			{ name: 'New field', value: '', hidden: false }
		);
	}
}
