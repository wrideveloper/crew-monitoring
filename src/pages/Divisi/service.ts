import axios from "axios"

export const endpoint = "https://crew-data-management.herokuapp.com/divisi/"

export function getDivisi() {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
}

export function createDivisi(input: IDivisi) {
  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, {
        divisi: input,
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

export function updateDivisi(input: IDivisi, id: string) {
  return new Promise((resolve, reject) => {
    axios
      .put(endpoint + id, {
        divisi: input,
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

export function deleteDivisi(id: string) {
  return new Promise((resolve, reject) => {
    axios
      .delete(endpoint + id)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}
