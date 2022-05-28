import { LocalStorage } from 'quasar'
import { TOKEN_STORAGE } from '../variables/LocalStorage'

export const isValidToken = () => {
  return getToken() != null
}

export const getToken = () => {
  return LocalStorage.getItem(TOKEN_STORAGE)
}

export const setToken = (token) => {
  LocalStorage.set(TOKEN_STORAGE, token)
}

export const logout = () => {
  LocalStorage.clear()
  location.href = '/'
}

export const loginService = async (username, password) => {
  return true
}
