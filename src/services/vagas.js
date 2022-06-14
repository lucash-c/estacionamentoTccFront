import { api } from "../boot/axios"

export const getVaga = async (tipo) => {
  return api.get('/vagas/' + tipo)
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

export const postVaga = async (vaga) => {
  return api.post('/vagas', vaga)
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


export const removeVaga = async (vaga) => {
  return api.delete('/vagas/remove', vaga)
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

export const updateVaga = async (vaga) => {
  return api.put('/vagas/update', vaga)
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
