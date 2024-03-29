import axiosClient from './axiosClient'

const postApi = {
  getAll(params) {
    const url = '/getfollowers'
    return axiosClient.get(url, params)
  },

  getById(id) {
    const url = `/posts/${id}`
    return axiosClient.get(url)
  },

  add(data) {
    const url = '/posts'
    return axiosClient.post(url, data)
  },

  update(data) {
    const url = `/posts/${data.id}`
    return axiosClient.patch(url, data)
  },

  delete(id) {
    const url = `/posts/${id}`
    return axiosClient.delete(url)
  },

  addFormData(data) {
    const url = `/with-thumbnail/posts`
    return axiosClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  updateFormData(data) {
    const url = `/with-thumbnail/posts/${data.get('id')}`
    return axiosClient.patch(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

export default postApi
