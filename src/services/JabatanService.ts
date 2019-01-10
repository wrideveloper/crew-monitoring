import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class JabatanService extends ServiceGenerator<IJabatan> {
  protected endpoint = serviceCrew + "jabatan/"
}
