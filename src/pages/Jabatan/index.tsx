import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { JabatanService } from "../../services/JabatanService"

interface IState {
  jabatan: IJabatan[]
  loading: boolean
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
    loading: false,
  }

  public jabatanService = new JabatanService()

  public componentDidMount() {
    this.getJabatan()
  }

  public async getJabatan() {
    this.setState({ loading: true })
    const jabatan = await this.jabatanService.get()
    this.setState({ jabatan, loading: false })
  }

  public async createJabatan(input: IJabatan) {
    this.setState({ loading: true })
    await this.jabatanService.create(input)
    this.getJabatan()
  }

  public async updateJabatan(input: IJabatan, id: string) {
    this.setState({ loading: true })
    await this.jabatanService.update(input, id)
    this.getJabatan()
  }

  public async deleteJabatan(id: string) {
    this.setState({ loading: true })
    await this.jabatanService.delete(id)
    this.getJabatan()
  }

  public render() {
    return (
      <Fragment>
        <Header content="Jabatan" subheader="Kumpulan data jabatan" />
        <DataTable
          data={this.state.jabatan}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input: IJabatan) => this.createJabatan(input)}
          onUpdate={(input: IJabatan) => this.updateJabatan(input, input._id)}
          onDelete={(input: IJabatan) => this.deleteJabatan(input._id)}
        />
      </Fragment>
    )
  }
}
