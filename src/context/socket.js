import React from "react";

export const SocketContext = React.createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = React.useState(null)

  const updateSocket = (isLogin) => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (isLogin) {
      setSocket(new WebSocket(process.env.REACT_APP_WS_URL + `?user_id=${user.id}`))
    } else {
      if (socket != null) {
        socket.close();
      }
      setSocket(null)
    }
  }

  return (
    <SocketContext.Provider value={{socket, updateSocket}}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider;