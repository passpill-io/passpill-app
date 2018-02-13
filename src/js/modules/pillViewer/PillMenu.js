import React from 'react';
import Searcher from './Searcher';


export default class PillMenu extends React.Component {
	render(){
		return (
			<div className="passMenu">
				<Searcher value={ this.props.search } />
			</div>
		);
	}
}
