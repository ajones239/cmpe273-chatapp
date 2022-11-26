/*
This component will take in an array of chat messages 
from our ChatApp.js function through its' props 
and will subsequently render them 
one under the other.
*/
import styles from '../Message/Message.scss';
import { client } from "../../api";

import React, { Component } from "react";
import "./ChatHistory.scss";

class ChatHistory extends Component {
    render() {
      const getClassName = function(msg) {
        let obj = JSON.parse(msg.data);
        console.log(obj.id);
        if (obj.id == client.Id) {
          return "MessageSelf";
        } else {
          return "Message";
        }
      }

      const messages = this.props.chatHistory.map((msg, index) => (
          <p className={getClassName(msg)} key={index}>{JSON.parse(msg.data).text}</p>
      ));

      return (
        <div className='ChatHistory'>
            <div className="p-3 mb-2 bg-light bg-gradient text-dark rounded-4">{messages}</div>                 
        </div>
      );
    };
}

export default ChatHistory;
