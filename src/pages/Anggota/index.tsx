import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { AnggotaService } from "../../services/AnggotaService"
import { DivisiService } from "../../services/DivisiService"
import { JabatanService } from "../../services/JabatanService"

interface IState {
  anggota: IAnggota[]
  jabatan: IJabatan[]
  divisi: IDivisi[]
}

const fields: IField[] = [
  {
    name: "nim",
    label: "NIM",
    type: "number",
  },
  {
    name: "nama",
    label: "Nama",
  },
  {
    name: "email",
    label: "Email",
    hide: true,
  },
  {
    name: "kontak",
    label: "Kontak",
    hide: true,
  },
  {
    name: "angkatan",
    label: "Angkatan",
    type: "number",
  },
  {
    name: "jabatan",
    label: "Jabatan",
    hide: true,
    type: "option",
    optionData: {
      data: [],
      labelKey: "nama",
      valueKey: "_id",
    },
  },
  {
    name: "divisi",
    label: "Divisi",
    type: "option",
    optionData: {
      data: [],
      labelKey: "nama",
      valueKey: "_id",
    },
  },
]

export default class Anggota extends Component<{}, IState> {
  public state: IState = {
    anggota: [],
    jabatan: [],
    divisi: [],
  }

  public anggotaService = new AnggotaService()
  public jabatanService = new JabatanService()
  public divisiService = new DivisiService()

  public componentDidMount() {
    this.get()
    this.getDivisi()
    this.getJabatan()
  }

  public getDivisi() {
    this.divisiService.get().then((divisi) => this.setState({ divisi }))
  }

  public getJabatan() {
    this.jabatanService.get().then((jabatan) => this.setState({ jabatan }))
  }

  public get() {
    this.anggotaService.get().then((anggota) => this.setState({ anggota }))
  }

  public create(input: IAnggota) {
    this.anggotaService.create(input).then(() => this.get())
  }

  public update(input: IAnggota, id: string) {
    this.anggotaService.update(input, id).then(() => this.get())
  }

  public delete(id: string) {
    this.anggotaService.delete(id).then(() => this.get())
  }

  public render() {
    fields[5].optionData!.data = this.state.jabatan
    fields[6].optionData!.data = this.state.divisi
    return (
      <Fragment>
        <Header content="Anggota" subheader="Kumpulan data anggota crew" />
        <DataTable<IAnggota>
          data={this.state.anggota}
          fields={fields}
          onCreate={(input) => this.create(input)}
          onUpdate={(input) => this.update(input, input._id)}
          onDelete={(input) => this.delete(input._id)}
        />
      </Fragment>
    )
  }
}
