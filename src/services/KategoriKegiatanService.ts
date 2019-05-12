import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class KategoriKegiatanService extends ServiceGenerator<
  IKategoriKegiatan
> {
  protected endpoint = api.serviceCrew + "kategoriKegiatan/"
}
