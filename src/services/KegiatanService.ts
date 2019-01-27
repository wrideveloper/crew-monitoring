import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class KegiatanService extends ServiceGenerator<IKegiatan> {
  protected endpoint = serviceCrew + "kegiatan/"
}
