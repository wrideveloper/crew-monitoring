import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class PresensiService extends ServiceGenerator<IPresensi> {
  protected endpoint = serviceCrew + "presensi/"
}
