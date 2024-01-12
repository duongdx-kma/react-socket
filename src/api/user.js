import axiosClient from './axios-client';

const UserAPI = {
  create(data) {
    return axiosClient.post('/register', data)
  },

  getAll(accessToken) {
    const url = '/users'
    return axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },

  getAllProject(accessToken, userId) {
    const url = `/projects?user_id=${userId}`
    return axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },
  getAllTask(accessToken, projectId) {
    const url = `/tasks?project_id=${projectId}`
    return axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },

  getProjectUser(accessToken, projectId) {
    const url = `/projects/get-users/${projectId}`
    return axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },

  findById(id, accessToken) {
    const url = "/users/" + id
    return axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },
}

export default UserAPI