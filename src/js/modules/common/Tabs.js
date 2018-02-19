import React, { Component } from 'react';

class Tabs extends Component {

	render() {
		let content = this.getContents( this.props.show );

		return (
			<div className="tabs">
				<div className="tabHeader">
					{ content.tabs }
				</div>
				<div className="tabBody">
					{ content.body }
				</div>
			</div>
		);
	}

	getContents( current ){
		let propChildren = this.props.children,
			noContent = {
				tabs: [ <a className="tabTitle">No tabs</a> ],
				body: <div>No tab content available</div>
			},
			tabs = [],
			content
		;

		if( !propChildren && !propChildren.nodeName && !propChildren.splice ){
			return noContent;
		}

		if( propChildren.nodeName ){
			content = this.getTabContents( propChildren );
			if( content ){
				return {
					tabs: [content.tab],
					body: content.body
				};
			}
		}
		else {
			// We have a list
			propChildren.forEach( c => {
				let tabContents = this.getTabContents(c, current);
				if( tabContents ){
					tabs.push( tabContents.tab );
					if( tabContents.isCurrent || !content ){
						content = tabContents.content;
					}
				}
			});
		}

		return { tabs, body: content };
	}

	getTabContents( node, current ){
		if(!node || !node.props || !node.props.id || !node.props['data-tabTitle']) return;

		let attrs = node.props,
			tabClass = 'tabTitle',
			isCurrent = attrs.id === current
		;

		if( isCurrent ){
			tabClass += ' tabCurrent';
		}

		return {
			id: attrs.id,
			tab: (
				<a className={ tabClass } key={ 't' + attrs.id } onClick={ () => this.props.onChange(attrs.id)}>
					{ attrs['data-tabTitle'] }
				</a>
			),
			content: node,
			isCurrent
		};
	}
}

export default Tabs;
