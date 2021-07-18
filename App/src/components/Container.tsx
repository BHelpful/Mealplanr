import React, { Component } from "react";
import "./Container.scss";

interface ContainerProps {
}

class Container extends Component<ContainerProps> {
  render() {
    const { children } = this.props;
    return (
      <div className="container">
        {children}
      </div>
    );
  }
}

export default Container;