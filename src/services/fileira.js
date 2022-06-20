/* eslint-disable */
import { api } from "../boot/axios"

export const getFileiras = async () => {
  return api.get('/fileiras')
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

export const getFileirasById = async (id) => {
  return api.get('/fileiras/id/' + id)
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

export const getFileiraByDesc = async (desc) => {
  return api.get('/fileiras/' + desc)
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

export const postFileira = async (fileira) => {
  return api.post('/fileiras/add', fileira)
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

export const putFileira = async (fileira) => {
  return api.put('/fileiras/update', fileira)
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

export const deleteFileira = async (id) => {
  return api.delete('/fileiras/remove/' + id)
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
