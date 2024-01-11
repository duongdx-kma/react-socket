import axiosClient from './axios-client';

const LoginAPI = {
  login(params) {
    console.log(params)

    return axiosClient.post('/login', params)
  }
}

export default LoginAPI