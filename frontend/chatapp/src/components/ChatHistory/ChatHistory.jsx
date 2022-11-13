/*
This component will take in an array of chat messages 
from our ChatApp.js function through its' props 
and will subsequently render them 
one under the other.
*/
import Message from '../Message';

import React, { Component } from "react";
import "./ChatHistory.scss";

class ChatHistory extends Component {
    render() {
        console.log(this.props.chatHistory);
        //console.log(messages);
       const messages = this.props.chatHistory.map((msg, index) => (
        <p key={index}>{msg.data}</p>
       ));
        console.log(messages);
        return (
          <div className='ChatHistory'>
             <div className="p-3 mb-2 bg-light bg-gradient text-dark rounded-4">{messages}</div>                 
          </div>
        );
      };
}

export default ChatHistory;