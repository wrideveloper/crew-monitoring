declare interface IRoute {
  name: string
  label?: string
  icon?: string
  path: string
  component: React.FunctionComponent | React.Components
  hide?: boolean
  private?: boolean
}

declare interface IAnggota {
  _id: string
  nim: number
  nama: string
  email: string
  kontak: string
  angkatan: number
  foto?: string | File
  jabatan?: IJabatan
  divisi?: IDivisi
  miniclass?: IMiniclass
}

declare interface IDivisi {
  _id: string
  nama: string
}

declare interface IJabatan {
  _id: string
  nama: string
}

declare interface IMiniclass {
  _id: string
  nama: string
  divisi: IDivisi
}

declare interface IPresensi {
  _id: string
  topik: string
  miniclass: IMiniclass
  angkatan: number
  tanggal: Date
  peserta: string[]
}

declare interface IKategoriKegiatan {
  _id: string
  nama: string
  keterangan: string
}

declare interface IKegiatan {
  _id: string
  nama: string
  laporan: string
  kategoriKegiatan: IKategoriKegiatan
}

declare interface INomorSurat {
  _id: string
  nomor: string
  keperluan: string
  anggota: IAnggota
}

declare interface IAdmin {
  _id: string
  username: string
  password: string
  level: ILevel
}

declare interface ILevel {
  _id: string
  nama: string
  hakAkses: string[]
}

declare interface IAppContext {
  token: string
  user: IAdmin
  login: (token: string, user: IAdmin, callback: () => void) => void
  logout: () => void
  isLoggedIn: () => boolean
}

interface ILogin {
  success: boolean
  token?: string
  user?: IAdmin
}
