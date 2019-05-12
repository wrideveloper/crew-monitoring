import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class PresensiService extends ServiceGenerator<IPresensi> {
  protected endpoint = api.serviceCrew + "presensi/"
}
