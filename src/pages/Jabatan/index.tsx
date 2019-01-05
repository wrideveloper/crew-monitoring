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
    this.getJabatan()
  }

  public getJabatan() {
    this.jabatanService.get().then((jabatan) => this.setState({ jabatan }))
  }

  public createJabatan(input: IJabatan) {
    this.jabatanService.create(input).then(() => this.getJabatan())
  }

  public updateJabatan(input: IJabatan, id: string) {
    this.jabatanService.update(input, id).then(() => this.getJabatan())
  }

  public deleteJabatan(id: string) {
    this.jabatanService.delete(id).then(() => this.getJabatan())
  }

  public render() {
    return (
      <Fragment>
        <Header content="Jabatan" subheader="Kumpulan data jabatan" />
        <DataTable
          data={this.state.jabatan}
          fields={fields}
          onCreate={(input: IJabatan) => this.createJabatan(input)}
          onUpdate={(input: IJabatan) => this.updateJabatan(input, input._id)}
          onDelete={(input: IJabatan) => this.deleteJabatan(input._id)}
        />
      </Fragment>
    )
  }
}
