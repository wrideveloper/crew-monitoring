import axios from "axios"
import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class NomorSuratService extends ServiceGenerator<INomorSurat> {
  protected endpoint = serviceCrew + "nomorSurat/"
}
