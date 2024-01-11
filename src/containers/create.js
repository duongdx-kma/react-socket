import React, {useState} from 'react';
import "./styles/create.css";
import {useNavigate} from "react-router-dom";
import UserAPI from "../api/user";

const Create = () => {
  const navigate = useNavigate();
  // React States
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState({
    name: "",
    address: "",
    password: "",
    age: 0
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await UserAPI.create({
        name: data.name,
        address: data.address,
        password: data.password,
        age: parseInt(data.age),
      });

      navigate('/users')
    } catch (err) {
      if (err?.response?.data?.Code == 422) {
        setErrorMessage(err?.response?.data?.Message)
      } else {
        setErrorMessage('Server error')
      }
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
          <input type="text" name="name" value={data.name} onChange={changeInput} required />
        </div>
        <div className="input-container">
          <label>Address </label>
          <input type="text" name="address" value={data.address} onChange={changeInput} required />
        </div>
        <div className="input-container">
          <label>Age </label>
          <input type="number" name="age" value={data.age} onChange={changeInput} required />
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
        <div className="title">Create user</div>
        <span className={"error"}>{errorMessage}</span>
        {renderForm}
      </div>
    </div>
  );
}

export default Create;