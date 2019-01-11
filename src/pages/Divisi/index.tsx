import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { DivisiService } from "../../services/DivisiService"

interface IState {
  divisi: IDivisi[]
  loading: boolean
}

const fields: IField[] = [
  {
    name: "nama",
    label: "Nama Divisi",
  },
]

export default class Divisi extends Component<{}, IState> {
  public state: IState = {
    divisi: [],
    loading: false,
  }

  public divisiService = new DivisiService()

  public componentDidMount() {
    this.getDivisi()
  }

  public async getDivisi() {
    this.setState({ loading: true })
    const divisi = await this.divisiService.get()
    this.setState({ divisi, loading: false })
  }

  public async createDivisi(input: IDivisi) {
    this.setState({ loading: true })
    await this.divisiService.create(input)
    this.getDivisi()
  }

  public async updateDivisi(input: IDivisi, id: string) {
    this.setState({ loading: true })
    await this.divisiService.update(input, id)
    this.getDivisi()
  }

  public async deleteDivisi(id: string) {
    this.setState({ loading: true })
    await this.divisiService.delete(id)
    this.getDivisi()
  }

  public render() {
    return (
      <Fragment>
        <Header content="Divisi" subheader="Kumpulan data divisi" />
        <DataTable<IDivisi>
          data={this.state.divisi}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createDivisi(input)}
          onUpdate={(input) => this.updateDivisi(input, input._id)}
          onDelete={(input) => this.deleteDivisi(input._id)}
        />
      </Fragment>
    )
  }
}
