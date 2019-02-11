import axios from "axios"
import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

interface ILogin {
  success: boolean
  token?: string
}

export class AdminService extends ServiceGenerator<IAdmin> {
  protected endpoint = serviceCrew + "admin/"
  protected loginEndpoint = serviceCrew + "login/"

  public login(username: string, password: string) {
    return new Promise<ILogin>((resolve, reject) => {
      axios
        .post(
          this.loginEndpoint,
          { username, password },
          { headers: this.getHeader() },
        )
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
