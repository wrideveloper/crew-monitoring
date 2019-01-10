import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class DivisiService extends ServiceGenerator<IDivisi, IDivisiInput> {
  protected endpoint = serviceCrew + "divisi/"
}
