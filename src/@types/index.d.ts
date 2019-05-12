declare interface IRoute {
  label?: string
  icon?: string
  path: string
  component: React.FunctionComponent | React.Components
  hide?: boolean
  private?: boolean
}

declare interface IField {
  name: string
  label: string
  type?: "text" | "password" | "option" | "image" | "date"
  validations?: string[]
  optionData?: IOptionData
  hide?: boolean
}

declare interface IOptionData {
  data: any[]
  textKey: string
  valueKey: string
}

declare interface IAnggota {
  _id: string
  nim: number
  nama: string
  email: string
  kontak: string
  angkatan: number
  foto?: string | File
  jabatan?: IJabatan | string
  divisi?: IDivisi | string
  miniclass?: IMiniclass | string
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
  divisi: IDivisi | string
}

declare interface IPresensi {
  _id: string
  topik: string
  miniclass: string | IMiniclass
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
  kategoriKegiatan: string | IKategoriKegiatan
}

declare interface INomorSurat {
  _id: string
  nomor: string
  keperluan: string
  anggota: string | IAnggota
}

declare interface IAdmin {
  _id: string
  username: string
  password: string
}

declare interface IAppContext {
  token: string
  setToken: (token: string) => void
  isLoggedIn: () => boolean
}

interface ILogin {
  success: boolean
  token?: string
}
