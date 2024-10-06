import axios from "axios"
const baseurl = ""http://localhost:3001/persons""

const create = (newObj) => {
  const request = axios.post(baseurl, newObj)
  return request.then((response) => response.data)
}

const update = (id, newObj) => {
  const request = axios.put(`${baseurl}/${id}`, newObj)
  return request.then((response) => response.data)
}

const getAll = () => {
  const request = axios.get(baseurl)
  return request.then((response) => response.data)
}

const del = (id) => {
  const request = axios.delete(`${baseurl}/${id}`)
  return request.then((response) => response.data)
}

export default { create, update, getAll, del }
