import { api } from "../boot/axios"
import { LocalStorage } from 'quasar'
import { USER_STORAGE } from "src/variables/LocalStorage"

export const isValidToken = () => {
  return getToken() != null
}

export const getToken = () => {
  return LocalStorage.getItem(USER_STORAGE)
}

export const setToken = (user) => {
  LocalStorage.set(USER_STORAGE, user)
}

export const logout = () => {
  LocalStorage.clear()
  location.href = '/'
}

export const loginService = async (username, password) => {
  return api.get('usuarios/login?email=' + username + '&senha=' + password)
    .then((response) => {
      if (response.status == 200) {
        return response;
      }
      return null;
    })
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      return null;
    })

}
