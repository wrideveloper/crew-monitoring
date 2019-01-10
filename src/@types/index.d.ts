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
  labelKey: string
  valueKey: string
}

declare interface IDivisi {
  _id: string
  nama: string
}

declare interface IDivisiInput {
  _id: string
  nama: string
}

declare interface IJabatan {
  _id: string
  nama: string
}

declare interface IJabatanInput {
  _id: string
  nama: string
}

declare interface IAnggota {
  _id: string
  nim: number
  nama: string
  email: string
  kontak: string
  angkatan: number
  foto?: string
  jabatan?: IJabatan
  divisi?: IDivisi
  miniclass?: IMiniclass
}

declare interface IAnggotaInput {
  _id: string
  nim: number
  nama: string
  email: string
  kontak: string
  angkatan: number
  foto?: File
  jabatan?: string
  divisi?: string
  miniclass?: string
}

declare interface IMiniclass {
  _id: string
  nama: string
  divisi: IDivisi
}

declare interface IMiniclassInput {
  _id: string
  nama: string
  divisi: string
}

declare interface IPresensi {
  _id: string
  topik: string
  miniclass: IMiniclass
  angkatan: number
  tanggal: Date
  peserta: string[]
}

declare interface IPresensiInput {
  _id: string
  topik: string
  miniclass: string
  angkatan: number
  tanggal: Date
  peserta: string[]
}
