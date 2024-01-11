import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import UserAPI from "../api/user";

const List = () => {
  const [users, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await UserAPI.getAll(localStorage.getItem('token'));
      setUsers(response?.data)
    } catch (err) {
      setErrorMessage('Server error')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const render = () => {
    return users && users.map((user) =>
      <div className={"row"} style={{margin: 5}} key={user.id}>
        <div className={"col-7"} style={{margin: 5}}>UserName: {user.name}</div>
        <div className={"col-4"}>
          <Link style={{margin: 5}} to={"/users/" + user.id}>
            <button className={"common-button"}>Detail</button>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div style={{margin: 'auto'}} className={"align-baseline w-75"}>
      <Link style={{margin: 5}} to="/users/create">
        <button className={"btn btn-info"}>Create User</button>
      </Link>
      <div style={{color: "red"}}>{errorMessage}</div>
      <div>
        <h3>List user page</h3>
        {render()}
      </div>
    </div>
  );
}

export default List;