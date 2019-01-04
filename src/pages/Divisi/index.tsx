import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { createDivisi, deleteDivisi, getDivisi, updateDivisi } from "./service"

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

  public componentDidMount() {
    this.get()
  }

  public get() {
    getDivisi().then((divisi) => this.setState({ divisi: divisi as IDivisi[] }))
  }

  public create(input: IDivisi) {
    createDivisi(input).then(() => this.get())
  }

  public update(input: IDivisi, id: string) {
    updateDivisi(input, id).then(() => this.get())
  }

  public delete(id: string) {
    deleteDivisi(id).then(() => this.get())
  }

  public render() {
    return (
      <Fragment>
        <Header content="Divisi" subheader="Kumpulan data divisi" />
        <DataTable
          data={this.state.divisi}
          fields={fields}
          onCreate={(input: IDivisi) => this.create(input)}
          onUpdate={(input: IDivisi) => this.update(input, input._id)}
          onDelete={(input: IDivisi) => this.delete(input._id)}
        />
      </Fragment>
    )
  }
}
