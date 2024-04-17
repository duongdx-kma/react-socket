import React, {useEffect} from 'react';
import { useState } from "react";
import "./App.css"
import {Link, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {SocketContext} from './context/socket'

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [active, setActive] = useState('home')
  const location = useLocation()
  const userRoute = ['users']
  const projectRoute = ['projects', 'tasks']
  const { updateSocket  } = React.useContext(SocketContext)

  const getRoutePath = (location) => {
    const { pathname } = location;

    switch (true) {
      case userRoute.find(a => pathname.includes(a)) !== undefined:
        console.log('usersusersusersusers')
        setActive('users')
        break
      case projectRoute.find(a => pathname.includes(a)) !== undefined:
        setActive('projects')
        break
      default:
        setActive('home')
        break
    }
  };

  useEffect(() => {
    getRoutePath(location)
  }, [location, getRoutePath])

  useEffect(() => {
    updateSocket(isLogin)
  }, [isLogin, updateSocket])

  const logout = () => {
    setIsLogin('')
    setUser({})
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    localStorage.removeItem('user')
    updateSocket(false)
    window.location.href="/sign-in"
  }

  const renderContent = () => {
    return <div className={'row m-5'}>
      <div className={'col-3'}>
        {user ? <span style={{fontSize: 25}}><span>Welcome!</span><span className={'text-success'}> {user.name}</span></span> : ''}
      </div>
      {isLogin ?
        <div className={'col-9'}>
            <Link style={{margin: 5}} id="RouterNavLink" to="/">
              <button className={'btn ' + (active === 'home' ? 'btn-success' : 'btn-secondary') }>Home</button>
            </Link>
            <Link style={{margin: 5}} id="RouterNavLink" to="/users">
              <button className={'btn ' + (active === 'users' ? 'btn-success' : 'btn-secondary')}>Users</button>
            </Link>
            <Link style={{margin: 5}} id="RouterNavLink" to="/projects">
              <button className={'btn ' + (active === 'projects' ? 'btn-success' : 'btn-secondary')}>Projects</button>
            </Link>
          <button onClick={logout}  className="btn btn-secondary">Logout</button>
        </div> :
        <></>}
    </div>
  }

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
