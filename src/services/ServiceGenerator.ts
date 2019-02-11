import axios from "axios"

export class ServiceGenerator<T> {
  protected endpoint = ""

  public get() {
    return new Promise<T[]>((resolve, reject) => {
      axios
        .get(this.endpoint, { headers: this.getHeader() })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public getById(id: string) {
    return new Promise<T>((resolve, reject) => {
      axios
        .get(this.endpoint + id, { headers: this.getHeader() })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public create(input: T) {
    return new Promise<T>((resolve, reject) => {
      axios
        .post(this.endpoint, input, { headers: this.getHeader() })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public update(input: T, id: string) {
    return new Promise<T>((resolve, reject) => {
      axios
        .put(this.endpoint + id, input, { headers: this.getHeader() })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public delete(id: string) {
    return new Promise<T>((resolve, reject) => {
      axios
        .delete(this.endpoint + id, { headers: this.getHeader() })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  protected getHeader() {
    return {
      "authorization": "Bearer " + localStorage.getItem("authToken") || "",
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  }
}
