import React, { Component } from "react";



let webSocket, chatId;


class Chatting extends Component {
  state = {
    name: ""
  };

  
  startChat = ()=>{
    webSocket = new WebSocket("ws://localhost:8080");
    // onopen: 소켓에 연결
    webSocket.onopen = function() {
      chatId = "[" + document.getElementById("chatId").value + "]";
      if (chatId) {
        alert("채팅 시작");
      } else {
        alert("채팅 아이디를 입력하세요");
      }
    };
    // onmessage: 메시지를 받았을때
    webSocket.onmessage = function(event) {
      console.log(event.data);
      document.getElementById("chatArea").value += event.data;
    };
  }

  sendMsg=(event)=>{
    console.log(event);
    if (event.key === "Enter") {
      console.log("서버로 전송시작");
      // send: 서버에 메시지를 보낼때
      webSocket.send(chatId + document.getElementById("sendMessage").value + "\n");
      document.getElementById("sendMessage").value = "";
    }
  }


  render() {


    return (
      <div>
        <h2>실시간 채팅</h2>
        <input id="chatId" placeholder="아이디 입력" />
        <button onClick={this.startChat}>채팅 시작</button>
        <br /><br />
        <textarea row="10" cols="50" id="chatArea" ></textarea>
        <br />
        <input onKeyPress={this.sendMsg} id="sendMessage"></input>
      </div>
    );
  }
}

export default Chatting;
