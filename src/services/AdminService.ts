import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class AdminService extends ServiceGenerator<IAdmin> {
  protected endpoint = serviceCrew + "admin/"
}
