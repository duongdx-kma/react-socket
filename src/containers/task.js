import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import UserAPI from "../api/user";
import {Col, Form, Button} from "react-bootstrap";
import {SocketContext} from "../context/socket";

const Task = () => {
  const navigate = useNavigate()
  const { socket  } = React.useContext(SocketContext)
  const [queryString] = useSearchParams()
  const initData = {
    event_name: 'create/task',
    project_id: parseInt(queryString.get('project_id')),
    title: '',
    description: '',
  }

  const [tasks, setTask] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const [dataCreate, setDataCreate] = useState(initData);
  const [users, setUsers] = useState([]);

  const sortArrayDesc = (array) => {
    return array.sort(function (a, b) {
      return b.task_id - a.task_id;
    })
  }
  const fetchDataTask = async (projectId) => {
    if (projectId === undefined || projectId == null || projectId === '') {
      navigate('/projects')
    }

    try {
      const response = await UserAPI.getAllTask(localStorage.getItem('token'), projectId);
      setTask(sortArrayDesc(response?.data))
    } catch (err) {
      setErrorMessage('Server error')
    }
  }

  const fetchUsers = async (projectId) => {
    if (projectId === undefined || projectId == null || projectId === '') {
      navigate('/projects')
    }

    try {
      const response = await UserAPI.getProjectUser(localStorage.getItem('token'), projectId);
      setUsers(response?.data)
    } catch (err) {
      setErrorMessage('Server error')
    }
  }

  useEffect(() => {
    const projectId = queryString.get('project_id')

    if (projectId === undefined || projectId == null || projectId === '') {
      navigate('/projects')
    }

    fetchDataTask(projectId)
    fetchUsers(projectId)
  }, [fetchDataTask, fetchUsers, navigate])

  useEffect(() => {
    try {
      socket.addEventListener("message", event => {
        const newProject = [
          ...tasks
        ]
        const dataResponse = JSON.parse(event.data)

        newProject.push({
          task_id: dataResponse?.task_id,
          title: dataResponse?.title,
          description: dataResponse?.description,
          project_id: dataResponse?.project_id,
          users: dataResponse?.users
        })

        setTask(sortArrayDesc(newProject))
        setDataCreate({
          ...initData,
          users: users
        })
      })
    } catch (err) {
      setErrorMessage('ERRRRORRRRR')
    }
  }, [socket, tasks, initData, users])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ((typeof users === 'undefined' || users.length <= 0) ||
      dataCreate.event_name === '' ||
      dataCreate.project_id === '' ||
      dataCreate.title === '' ||
      dataCreate.description === ''
    ) {
      setErrorMessage("Data invalid")

      return
    }

    try {
      socket.send(JSON.stringify({
        "event_name": dataCreate.event_name,
        "title": dataCreate.title,
        "description": dataCreate.description,
        "project_id": dataCreate.project_id,
        "users": users
      }))
    } catch (err) {
      console.log('senddddddddddddding error')
    }
  };

  const changeInput = (event) => {
    const {name, value} = event.target
    setDataCreate({...dataCreate, [name]: value})
    setErrorMessage("")
  }

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            aria-required={true}
            name="title"
            value={dataCreate.title}
            onChange={changeInput}
            type="text"
            placeholder="Title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            aria-required={true}
            name="description"
            value={dataCreate.description}
            onChange={changeInput}
            type="text"
            placeholder="Description"
          />
        </Form.Group>
        <Form.Group style={{marginTop: 20, marginBottom: 20}} as={Col} controlId="1111">
          <Button type="submit">Submit</Button>
        </Form.Group>
      </form>
    </div>
  );

  const render = () => {
    return tasks && tasks.map((task) =>
      <div style={{margin: 5, border: 1}} key={task.task_id}>
        <hr/>
        <div style={{margin: 5, fontSize: 20}}>ID: {task.task_id}</div>
        <div style={{margin: 5}}>
          <p>Title: {task.title}</p>
        </div>
        <div style={{margin: 5}}>
          <p>Description: {task.description}</p>
        </div>
      </div>
    )
  }
  return (
    <div style={{margin: 'auto'}} className={"align-baseline w-75"}>
      <h2>Project: {queryString.get('project_name')}</h2>
      <div style={{color: "red"}}>{errorMessage}</div>
      {renderForm}

      <div>
        <h3>List Task</h3>
        {render()}
      </div>
    </div>
  );
}

export default Task;