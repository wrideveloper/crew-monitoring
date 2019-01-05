import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { AnggotaService } from "../../services/AnggotaService"

interface IState {
  anggota: IAnggota[]
}

const fields: IField[] = [
  {
    name: "nim",
    label: "NIM",
  },
  {
    name: "nama",
    label: "Nama",
  },
  {
    name: "email",
    label: "Email",
  },
  {
    name: "kontak",
    label: "Kontak",
  },
  {
    name: "angkatan",
    label: "Angkatan",
  },
  {
    name: "jabatan",
    label: "Jabatan",
  },
  {
    name: "divisi",
    label: "Divisi",
  },
]

export default class Anggota extends Component<{}, IState> {
  public state: IState = {
    anggota: [],
  }

  public anggotaService = new AnggotaService()

  public componentDidMount() {
    this.get()
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
