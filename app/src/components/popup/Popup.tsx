import React, { Component } from "react";
import './Popup.scss';

interface PopupProps {
  type: string,
}

 class Popup extends Component<PopupProps> {

  render() {
    const {type, children} = this.props;
    return (
      <div id={type} className={"popup"}>
        {children}
      </div>
    );
  }

}

export default Popup;