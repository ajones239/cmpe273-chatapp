// src/components/Message/Message.jsx
import React, { Component } from "react";
import "./Message.scss";

class Message extends Component {
  constructor(props) {
    super(props);
    //The JSON.stringify method returns 
    //a string containing the JSON representation 
    //of the object.
    const obj = JSON.stringify(this.props.message);
    //convert string back to object using parse
    let temp = JSON.parse(obj);
    this.state = {
      message: temp
    };
  }

  render() {
    let msg = this.state.message;
    let cname = "";
    if (msg.id === "id") {
      cname = "Message.me";
    } else {
      cname = "Message";
    }
    return <div className={cname}>{msg.text}</div>;
  }
}

export default Message;
