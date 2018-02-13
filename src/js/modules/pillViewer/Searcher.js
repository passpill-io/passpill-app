import React from 'react';
import LineInput from 'modules/common/lineInput';

export default function Searcher( props ){
	var indev;

	if( props.value.query ){
		indev = <div className="alert yellow">Passes search needs to be developed yet.</div>;
	}

	return (
		<div className="searcher">
			<LineInput className="searcherInput"
				label="Search passes"
				value={ props.value.query }
				onChange={ e => props.value.set({query: e.target.value}).now() } />
			<i className="fa fa-search"></i>
			{ indev }
		</div>
	);
}
