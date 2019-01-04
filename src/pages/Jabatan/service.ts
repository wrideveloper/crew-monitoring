import axios from "axios"
import { serviceCrew } from "../../config"

export const endpoint = serviceCrew + "jabatan/"

export function getJabatan() {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
}

export function createJabatan(input: IJabatan) {
  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, {
        jabatan: input,
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

export function updateJabatan(input: IJabatan, id: string) {
  return new Promise((resolve, reject) => {
    axios
      .put(endpoint + id, {
        jabatan: input,
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

export function deleteJabatan(id: string) {
  return new Promise((resolve, reject) => {
    axios
      .delete(endpoint + id)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}
