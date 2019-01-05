declare interface IRoute {
  label: string
  path: string
  component: React.FunctionComponent | React.Components
}

declare interface IField {
  name: string
  label: string
  type?: "text" | "number" | "password" | "option"
  hide?: boolean
  optionData?: IOptionData
}

declare interface IOptionData {
  data: any[]
  labelKey: string
  valueKey: string
}

declare interface IAnggota {
  _id: string
  nim: number
  nama: string
  email: string
  kontak: string
  angkatan: number
  foto?: string
  jabatan?: IJabatan | string
  divisi?: IDivisi | string
}

declare interface IDivisi {
  _id: string
  nama: string
}

declare interface IJabatan {
  _id: string
  nama: string
}
