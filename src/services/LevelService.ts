import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class LevelService extends ServiceGenerator<ILevel> {
  protected endpoint = api.serviceCrew + "level/"
}
