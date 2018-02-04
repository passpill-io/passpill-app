import React from 'react';
import PassItem from './PassItem';


export default class PassList extends React.Component {
	render(){
		return (
			<div className="passList">
				<h3><i className="fa fa-id-card icon icon-rotated"></i> Your passes</h3>
				{ this.renderPasses() }
			</div>
		);
	}

	renderPasses(){
		let passes = this.props.passes,
			order = this.props.order
		;

		if( !order.length ){
			return this.renderNoPasses();
		}

		let list = [];

		order.forEach( id => {
			var p = passes[id];
			if( p ){
				list.push(
					<PassItem pass={ p }
						key={id}
						onEdit={ id => this.props.onEdit(id) } />
				);
			}
		});

		list.push(
			this.renderCreateButton()
		);

		return list;
	}

	renderNoPasses(){
		return (
			<div className="box inset">
				<p>You don't have any pass in this pill yet. Why don't you create a new one?</p>
				<p>{ this.renderCreateButton() }</p>
			</div>
		)
	}

	renderCreateButton(){
		return (
			<button className="buttonBlock" onClick={ () => this.props.onCreate() }>Create pass</button>
		);
	}


}
