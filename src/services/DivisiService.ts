import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class DivisiService extends ServiceGenerator<IDivisi> {
  protected endpoint = serviceCrew + "divisi/"
}
