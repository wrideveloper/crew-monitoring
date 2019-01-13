declare interface IRoute {
  label: string
  path: string
  component: React.FunctionComponent | React.Components
  hide?: boolean
}

declare interface IField {
  name: string
  label: string
  type?: "text" | "number" | "password" | "option" | "image" | "date"
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

declare interface IAdmin {
  _id: string
  username: string
  password: string
}
