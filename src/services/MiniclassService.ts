import axios from "axios"
import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class MiniclassService extends ServiceGenerator<IMiniclass> {
  protected endpoint = serviceCrew + "miniclass/"

  protected getAnggota(id: string, angkatan: number) {
    return new Promise<IAnggota[]>((resolve, reject) => {
      axios
        .get(this.endpoint + id + "/" + angkatan)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
