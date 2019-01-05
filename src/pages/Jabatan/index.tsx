import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { JabatanService } from "../../services/JabatanService"

interface IState {
  jabatan: IJabatan[]
}

const fields: IField[] = [
  {
    name: "nama",
    label: "Nama Jabatan",
  },
]

export default class Jabatan extends Component<{}, IState> {
  public state: IState = {
    jabatan: [],
  }

  public jabatanService = new JabatanService()

  public componentDidMount() {
    this.get()
  }

  public get() {
    this.jabatanService.get().then((jabatan) => this.setState({ jabatan }))
  }

  public create(input: IJabatan) {
    this.jabatanService.create(input).then(() => this.get())
  }

  public update(input: IJabatan, id: string) {
    this.jabatanService.update(input, id).then(() => this.get())
  }

  public delete(id: string) {
    this.jabatanService.delete(id).then(() => this.get())
  }

  public render() {
    return (
      <Fragment>
        <Header content="Jabatan" subheader="Kumpulan data jabatan" />
        <DataTable
          data={this.state.jabatan}
          fields={fields}
          onCreate={(input: IJabatan) => this.create(input)}
          onUpdate={(input: IJabatan) => this.update(input, input._id)}
          onDelete={(input: IJabatan) => this.delete(input._id)}
        />
      </Fragment>
    )
  }
}
