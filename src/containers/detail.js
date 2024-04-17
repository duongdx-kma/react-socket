import React, {useEffect, useState, useCallback} from 'react';
import "./styles/login.css";
import UserAPI from "../api/user";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  const fetchData = useCallback( async () => {
    try {
      const response = await UserAPI.findById(id, localStorage.getItem('token'));
      console.log(response?.data)
      console.log(response?.data?.age)
      setUser(response?.data)
    } catch (err) {
      setErrorMessage('Server error')
    }
  }, [setUser, setErrorMessage, id])
  useEffect( () => {
    fetchData()
  }, [fetchData])

  return (
    <div className="app">
      <div style={{color: "red"}}>{errorMessage}</div>
      <div>UserName: {user.name}</div>
      <div>Age: {user.age}</div>
      <div>Address: {user.address}</div>
    </div>
  );
}

export default Detail;