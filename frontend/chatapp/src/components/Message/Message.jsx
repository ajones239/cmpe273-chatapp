// src/components/Message/Message.jsx
import React, { Component } from "react";
import "./Message.scss";

class Message extends Component {
  render() {
    if (this.props.img) {
      return (
        <div className={this.props.cname}>
          <img src={`data:image/jpg;base64,${this.props.data}`} alt="test" />
        </div>
      );
    } else {
      return <div className={this.props.cname}>{this.props.data}</div>;
    }
  }
}

export default Message;
