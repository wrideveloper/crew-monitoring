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
  nama: string
}

declare interface IJabatan {
  nama: string
}
