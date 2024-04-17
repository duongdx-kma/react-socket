import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {Link} from "react-router-dom";
import UserAPI from "../api/user";
import {Col, Form, Button} from "react-bootstrap";
import {SocketContext} from "../context/socket";

const Project = () => {
  const { socket  } = React.useContext(SocketContext)
  const userLogin = JSON.parse(localStorage.getItem('user'))

  const initData = useMemo(() => {
    return {
      event_name: 'create/project',
      project_id: '',
      name: '',
      users: [JSON.parse(localStorage.getItem('user')).id]
    };
  }, [])

  const [users, setUsers] = useState([])
  const [projects, setProject] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const [dataCreate, setDataCreate] = useState(initData);

  const fetchDataUser = useCallback(async () => {
    try {
      const response = await UserAPI.getAll(localStorage.getItem('token'));
      setUsers(response?.data)
    } catch (err) {
      setErrorMessage('Server error')
    }
  }, [setUsers, setErrorMessage])

  const sortArrayDesc = useCallback((array) => {
    return array.sort(function (a, b) {
      return b.project_id - a.project_id;
    })
  }, [])

  const fetchDataProjects = useCallback(async () => {
    try {
      const response = await UserAPI.getAllProject(localStorage.getItem('token'), userLogin.id);
      setProject(sortArrayDesc(response?.data))
    } catch (err) {
      setErrorMessage('Server error')
    }
  }, [setProject, setErrorMessage, sortArrayDesc, userLogin])

  useEffect(() => {
    fetchDataUser()
    fetchDataProjects()
  }, [fetchDataUser, fetchDataProjects])

  useEffect(() => {
    try {
      socket.addEventListener("message", event => {
        const newProject = [
          ...projects
        ]
        const dataResponse = JSON.parse(event.data)

        newProject.push({
          project_id: dataResponse?.project_id,
          name: dataResponse?.name,
          users: dataResponse?.users
        })

        setProject(sortArrayDesc(newProject))
        setDataCreate(initData)
      })
    } catch (err) {
      setErrorMessage('ERRRRORRRRR')
    }
  }, [socket, projects, initData, sortArrayDesc])

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    if ((typeof dataCreate.users === 'undefined' && dataCreate.users.length <= 0) ||
      dataCreate.event_name === '' ||
      dataCreate.name === ''
    ) {
      setErrorMessage("Data invalid")

      return
    }

    try {
      socket.send(JSON.stringify({
        "event_name": dataCreate.event_name,
        "name": dataCreate.name,
        "users": dataCreate.users
      }))
    } catch (err) {
      console.log('senddddddddddddding error')
    }
  }, [dataCreate.event_name, dataCreate.name, dataCreate.users, socket]);

  const changeInput = (event) => {
    const {name, value} = event.target
    setDataCreate({...dataCreate, [name]: value})
    setErrorMessage("")
  }

  const changeSelect = (event) => {
    const usersSelected = [].slice.call(event.target.selectedOptions).map(item => parseInt(item.value))

    if (!usersSelected.includes(parseInt(userLogin.id))) {
      usersSelected.push(parseInt(userLogin.id))
    }

    const newData = {
      ...dataCreate,
      users: usersSelected
    }

    setDataCreate(newData)
  }

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            aria-required={true}
            name="name"
            value={dataCreate.name}
            onChange={changeInput}
            type="text"
            placeholder="Project Name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="my_multiselect_field">
          <Form.Label>Users </Form.Label>
          <Form.Control as="select" multiple value={dataCreate.users} onChange={changeSelect}>
            {users && users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group style={{marginTop: 20, marginBottom: 20}} as={Col} controlId="1111">
          <Button type="submit">Submit</Button>
        </Form.Group>
      </form>
    </div>
  );

  const render = () => {
    return projects && projects.map((project) =>
      <div className={"row"} style={{margin: 5, border: 1}} key={project.project_id}>
        <div className={"col-2"} style={{margin: 5}}>ID: {project.project_id}</div>
        <div className={"col-4"} style={{margin: 5}}>Project Name: {project.name}</div>
        <div className={"col-3"}>
          <Link style={{margin: 5}} to={`/tasks?project_id=${project.project_id}&project_name=${project.name}`}>
            <button className={"common-button"}>Go to list Tasks</button>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div style={{margin: 'auto'}} className={"align-baseline w-75"}>
      <div style={{color: "red"}}>{errorMessage}</div>
      {renderForm}

      <div>
        <h3>List Project</h3>
        {render()}
      </div>
    </div>
  );
}

export default Project;