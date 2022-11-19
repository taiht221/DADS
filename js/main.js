import axiosClient from './api/axiosClient'
import postApi from './api/postApi'

async function main() {
  const params = {
    offset: 0,
    count: 50,
  }
  const reo = await postApi.getAll(params)
  console.log(reo)
}

main()
