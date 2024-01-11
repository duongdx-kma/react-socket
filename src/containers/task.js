import React, {useState} from 'react';
import "./styles/login.css";

const Update = () => {
  const token = localStorage.getItem('token')

  // const handleConnectSocket = async () => {
  //   if (!token) return;
  //   const s = new WebSocket(process.env.REACT_APP_WS_URL);
  //
  //   s.onopen = function () {
  //     const obj = {
  //       user_id: 1,
  //       is_jwt: true,
  //       is_group: false,
  //       to_id: -1,
  //       message: "testtttttt",
  //     };
  //     const jsonString = JSON.stringify(obj);
  //     s.send(jsonString);
  //   }
  //
  //   s.onclose = function () {
  //     alert("Connection has been closed.");
  //   };
  //
  //   setSocket(s);
  // };

  /*
  -----
  let socket = new WebSocket("ws://localhost:8088/ws?user_id=1")
  --------
  socket.onmessage = (event) => { console.log("message from server:", event.data)}
------
  socket.send(JSON.stringify({
  "event_name": "create/project",

    "name": "Testing project",
    "users": [1, 2, 3]
}))
--------
socket.send(JSON.stringify({
  "event_name": "create/task",
  "title": "task 1, 2,3, 6",
    "description": "Task description 1, 2,3,6",
    "users": [1, 2, 3, 6]
}))
   */

  return (
    <div className="app">
      Update page
    </div>
  );
}

export default Update;