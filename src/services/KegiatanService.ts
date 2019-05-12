import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class KegiatanService extends ServiceGenerator<IKegiatan> {
  protected endpoint = api.serviceCrew + "kegiatan/"
}
