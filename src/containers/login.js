import React, {useState} from 'react';
import "./styles/login.css";
import LoginAPI from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // React States
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState({
    user_name: "",
    password: ""
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await LoginAPI.login(data);
      localStorage.setItem("token", response?.data?.token)
      localStorage.setItem("admin", response?.data?.is_admin)
      localStorage.setItem("user", JSON.stringify({
          id: response?.data?.id,
          name: response?.data?.name
        }
      ))
      window.location.href="/"
    } catch (err) {
      setErrorMessage(err?.response?.data?.message)
    }
  };
  
  const changeInput = (event) => {
    const {name, value} = event.target
    setData({...data, [name]: value})
    setErrorMessage("")
  }

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="user_name" value={data.user_name} onChange={changeInput} required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" value={data.password} onChange={changeInput} required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        <span className={"error"}>{errorMessage}</span>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;