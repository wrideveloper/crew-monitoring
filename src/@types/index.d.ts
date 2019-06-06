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
  hideOnTable?: boolean
  hideOnForm?: boolean
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
}

declare interface ILevel {
  _id: string
  nama: string
  akses: string[]
}

declare interface IAppContext {
  token: string
  setToken: (token: string) => void
  user: IAdmin
  setUser: (user: IAdmin) => void
  isLoggedIn: () => boolean
}

declare interface IDataTableContext {
  data: any[]
  loading: boolean
  getTableFields: () => IField[]
  getFormFields: () => IField[]

  onCreate?: (input: T) => void
  onUpdate?: (input: T) => void
  onDelete?: (input: T) => void

  open: boolean
  isUpdateMode: boolean
  openForm: (selectedData: any, isUpdateMode: boolean) => void
  closeForm: () => void

  selectedData: any
}

interface ILogin {
  success: boolean
  token?: string
  user?: IAdmin
}
