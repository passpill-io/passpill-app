
import React, { Component } from 'react';
import LineInput from 'modules/common/LineInput';


class Searcher extends Component {
	render() {
		var indev;

		if( this.props.value.query ){
			indev = <div className="alert yellow">Passes search needs to be developed yet.</div>;
		}

		return (
			<div className="searcher">
				<LineInput className="searcherInput"
					label="Search passes"
					value={ this.props.value.query }
					onChange={ e => this.update(e) }
					 />
				<i className="fa fa-search"></i>
				{ indev }
			</div>
		);
	}

	update( e ){
		this.props.value.query = e.target.value;
		this.forceUpdate();
	}
}

export default Searcher;
