import { api } from "../boot/axios"

export const getTickets = async () => {
  return api.get('/tickets')
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

export const getTicketById = async (id) => {
  return api.get('/tickets/id/' + id)
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

export const createTicket = async (data) => {
  return api.post('/tickets/add', data)
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

export const putTicket = async (ticket) => {
  return api.put('/tickets/update', ticket)
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

export const deleteTicket = async (id) => {
  return api.delete('/tickets/remove/' + id)
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
