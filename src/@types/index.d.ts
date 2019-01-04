declare interface IRoute {
  label: string
  path: string
  component: React.FunctionComponent | React.Components
}

declare interface IField {
  name: string
  label: string
}

declare interface IAnggota {
  _id: string
  nim: number
  nama: string
  email: string
  kontak: string
  angkatan: number
  foto?: string
  jabatan?: string
  divisi?: string
}

declare interface IDivisi {
  _id: string
  nama: string
}

declare interface IJabatan {
  _id: string
  nama: string
}
