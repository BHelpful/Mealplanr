import React, { Component } from 'react';
import './Container.scss';

interface ContainerProps {
	id?: string;
}

class Container extends Component<ContainerProps> {
	render() {
		const { id, children } = this.props;
		return (
			<div id={id} className="container">
				{children}
			</div>
		);
	}
}

export default Container;
