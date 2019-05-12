import axios from "axios"
import { api } from "../config"

export class LoginService {
  protected endpoint = api.serviceCrew + "login/"

  public login(username: string, password: string) {
    return new Promise<ILogin>((resolve, reject) => {
      axios
        .post(this.endpoint, { username, password })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
