import axios from "axios"
import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class NomorSuratService extends ServiceGenerator<INomorSurat> {
  protected endpoint = api.serviceCrew + "nomorSurat/"
}
