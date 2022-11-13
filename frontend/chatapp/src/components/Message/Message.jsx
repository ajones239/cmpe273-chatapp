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
    return <div className="Message">{this.state.message.body}</div>;
  }
}

export default Message;