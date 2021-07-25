import React, { Component } from 'react';
import './Container.scss';

interface ContainerProps {
	id?: string;
	className?: string;
}

class Container extends Component<ContainerProps> {
	render() {
		const { id, className, children } = {className: '', ...this.props};
		return (
			<div id={id} className={"container "+className}>
				{children}
			</div>
		);
	}
}

export default Container;
