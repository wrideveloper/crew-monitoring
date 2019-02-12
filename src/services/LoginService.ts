import axios from "axios"
import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

interface ILogin {
  success: boolean
  token?: string
}

export class LoginService {
  protected endpoint = serviceCrew + "login/"

  public login(username: string, password: string) {
    return new Promise<ILogin>((resolve, reject) => {
      axios
        .post(this.endpoint, { username, password })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
