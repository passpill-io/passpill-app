import React from 'react';
import LineInput from 'modules/common/LineInput';


export default class PillMenu extends React.Component {
	render(){
		return (
			<div className="passMenu">
				<div className="searchBox">
					<i className="fa fa-search"></i>
					Search
				</div>

				<LineInput type="text" className="lineInput"/>
			</div>
		);
	}
}
