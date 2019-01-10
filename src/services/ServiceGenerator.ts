import axios from "axios"

export class ServiceGenerator<TDATA, TINPUT> {
  protected endpoint = ""

  public get() {
    return new Promise<TDATA[]>((resolve, reject) => {
      axios
        .get(this.endpoint)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public getById(id: string) {
    return new Promise<TDATA>((resolve, reject) => {
      axios
        .get(this.endpoint + id)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public create(input: TINPUT) {
    return new Promise<TDATA>((resolve, reject) => {
      axios
        .post(this.endpoint, input)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public update(input: TINPUT, id: string) {
    return new Promise<TDATA>((resolve, reject) => {
      axios
        .put(this.endpoint + id, input)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public delete(id: string) {
    return new Promise<TDATA>((resolve, reject) => {
      axios
        .delete(this.endpoint + id)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
