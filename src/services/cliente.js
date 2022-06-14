/* eslint-disable */
import { api } from "../boot/axios"

export const getClientes = async () => {
  return api.get('/clientes')
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

export const putCliente = async (cliente) => {
  return api.put('/clientes/update', cliente)
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

export const postCliente = async (cliente) => {
  return api.post('/clientes/add', cliente)
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

export const deleteCliente = async (cod) => {
  return api.delete('/clientes/remove/' + cod)
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
