import Header from '../components/Header/Header';
import ChatHistory from '../components/ChatHistory/ChatHistory';
import ChatInput from '../components/ChatInput/ChatInput';
import React, { Component } from "react";
import { client, connect, sendMsg } from "../api";

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: []
    }
  }

  componentDidMount() {
    connect((msg) => {
      console.log("New Message")
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      console.log(msg);
      console.log(this.state.chatHistory);
    });
  }

  send(event) {
    if(event.keyCode === 13) {
      const obj = {
        text: event.target.value,
        id: client.Id
      }
      const msg = JSON.stringify(obj);
      sendMsg(msg);
      event.target.value = "";
    }
  }
  render() {
    return (
      <div className="ChatApp">
        <Header/>
        <ChatHistory chatHistory={this.state.chatHistory }/>
        <ChatInput send={this.send}/>
      </div>
    );
  }
}

export default ChatApp;
