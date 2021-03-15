import Axios from 'axios'

export const baseURL = window.location.origin.includes('localhost') ? 'https://bcw-sandbox.herokuapp.com/' : ''
export const sandboxApi = Axios.create({
  baseURL,
  timeout: 12000
})

export const setBearer = function(bearer) {
  sandboxApi.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  sandboxApi.defaults.headers.authorization = ''
}
