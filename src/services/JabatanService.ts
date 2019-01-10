import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class JabatanService extends ServiceGenerator<IJabatan, IJabatanInput> {
  protected endpoint = serviceCrew + "jabatan/"
}
