import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class AnggotaService extends ServiceGenerator<IAnggota> {
  protected endpoint = serviceCrew + "anggota/"
}
