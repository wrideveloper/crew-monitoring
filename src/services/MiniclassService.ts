import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class MiniclassService extends ServiceGenerator<IMiniclass> {
  protected endpoint = serviceCrew + "miniclass/"
}
