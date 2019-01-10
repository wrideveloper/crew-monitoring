import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { DivisiService } from "../../services/DivisiService"

interface IState {
  divisi: IDivisi[]
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
  }

  public divisiService = new DivisiService()

  public componentDidMount() {
    this.getDivisi()
  }

  public getDivisi() {
    this.divisiService.get().then((divisi) => this.setState({ divisi }))
  }

  public createDivisi(input: IDivisi) {
    this.divisiService.create(input).then(() => this.getDivisi())
  }

  public updateDivisi(input: IDivisi, id: string) {
    this.divisiService.update(input, id).then(() => this.getDivisi())
  }

  public deleteDivisi(id: string) {
    this.divisiService.delete(id).then(() => this.getDivisi())
  }

  public render() {
    return (
      <Fragment>
        <Header content="Divisi" subheader="Kumpulan data divisi" />
        <DataTable<IDivisi>
          data={this.state.divisi}
          fields={fields}
          onCreate={(input) => this.createDivisi(input)}
          onUpdate={(input) => this.updateDivisi(input, input._id)}
          onDelete={(input) => this.deleteDivisi(input._id)}
        />
      </Fragment>
    )
  }
}
