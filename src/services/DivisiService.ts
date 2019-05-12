import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class DivisiService extends ServiceGenerator<IDivisi> {
  protected endpoint = api.serviceCrew + "divisi/"
}
