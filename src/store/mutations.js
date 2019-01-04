import { localStorage } from '../assets/js/storage'

const mutations = {
  SET_USER (state, user) {
    state.user = user
    localStorage.setItem('user', user)
  },
  SET_TOKEN (state, token) {
    state.token = token
    localStorage.setItem('token', token)
  }
}

export default mutations
