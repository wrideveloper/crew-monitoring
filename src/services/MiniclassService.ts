import axios from "axios"
import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class MiniclassService extends ServiceGenerator<IMiniclass> {
  protected endpoint = api.serviceCrew + "miniclass/"

  public getAnggota(id: string) {
    return new Promise<IAnggota[]>((resolve, reject) => {
      axios
        .get(this.endpoint + id + "/anggota", { headers: this.getHeader() })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
