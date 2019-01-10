import axios from "axios"
import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class AnggotaService extends ServiceGenerator<IAnggota> {
  protected endpoint = serviceCrew + "anggota/"

  public uploadFoto(foto: File, id: string) {
    return new Promise<IAnggota>((resolve, reject) => {
      const formData = new FormData()
      formData.append("foto", foto)
      axios
        .put(this.endpoint + id + "/foto", formData)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
