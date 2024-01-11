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