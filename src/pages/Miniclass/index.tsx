import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { DivisiService } from "../../services/DivisiService"
import { MiniclassService } from "../../services/MiniclassService"

interface IState {
  miniclass: IMiniclass[]
  divisi: IDivisi[]
  loading: boolean
}

const fields: IField[] = [
  {
    name: "nama",
    label: "Nama Miniclass",
  },
  {
    name: "divisi",
    label: "Divisi",
    type: "option",
    optionData: {
      data: [],
      textKey: "nama",
      valueKey: "_id",
    },
  },
]

export default class Miniclass extends Component<{}, IState> {
  public state: IState = {
    miniclass: [],
    divisi: [],
    loading: false,
  }

  public miniclassService = new MiniclassService()
  public divisiService = new DivisiService()

  public componentDidMount() {
    this.getMiniclass()
    this.getDivisi()
  }

  public getDivisi() {
    this.divisiService.get().then((divisi) => this.setState({ divisi }))
  }

  public async getMiniclass() {
    this.setState({ loading: true })
    const miniclass = await this.miniclassService.get()
    this.setState({ miniclass, loading: false })
  }

  public async createAnggota(input: IMiniclass) {
    this.setState({ loading: true })
    await this.miniclassService.create(input)
    this.getMiniclass()
  }

  public async updateAnggota(input: IMiniclass, id: string) {
    this.setState({ loading: true })
    await this.miniclassService.update(input, id)
    this.getMiniclass()
  }

  public async deleteAnggota(id: string) {
    this.setState({ loading: true })
    await this.miniclassService.delete(id)
    this.getMiniclass()
  }

  public setOptionsData() {
    fields[1].optionData!.data = this.state.divisi
  }

  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header content="Miniclass" subheader="Kumpulan data miniclass" />
        <DataTable<IMiniclass>
          data={this.state.miniclass}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createAnggota(input)}
          onUpdate={(input) => this.updateAnggota(input, input._id)}
          onDelete={(input) => this.deleteAnggota(input._id)}
        />
      </Fragment>
    )
  }
}
