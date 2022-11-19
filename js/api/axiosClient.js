import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://openapi.zalo.me/v2.0/oa',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // Attach token to request if exists
    config.headers.Authorization = `Bearer n`

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data
  },
  function (error) {
    // Do something with response error
    console.log(error)

    // Unauthorize redirect to login
    // if (error.response.status === 401) window.location.assign('/login.html')

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error)
  }
)

export default axiosClient
