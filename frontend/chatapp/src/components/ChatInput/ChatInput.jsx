import React, { Component } from "react";
import ImageSelector from '../ImageSelector'
import "./ChatInput.scss";

class ChatInput extends Component {
  render() {
    return (
      <div className="ChatInput">
        <h3>Click an image to send it to the chat!</h3>
        <ImageSelector send={this.props.send}/>
        <input onKeyDown={this.props.send} />
      </div>
    );
  }
}

export default ChatInput;
