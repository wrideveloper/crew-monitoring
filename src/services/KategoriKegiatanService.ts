import { serviceCrew } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class KategoriKegiatanService extends ServiceGenerator<
  IKategoriKegiatan
> {
  protected endpoint = serviceCrew + "kategoriKegiatan/"
}
