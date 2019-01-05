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
    this.get()
  }

  public get() {
    this.divisiService.get().then((divisi) => this.setState({ divisi }))
  }

  public create(input: IDivisi) {
    this.divisiService.create(input).then(() => this.get())
  }

  public update(input: IDivisi, id: string) {
    this.divisiService.update(input, id).then(() => this.get())
  }

  public delete(id: string) {
    this.divisiService.delete(id).then(() => this.get())
  }

  public render() {
    return (
      <Fragment>
        <Header content="Divisi" subheader="Kumpulan data divisi" />
        <DataTable<IDivisi>
          data={this.state.divisi}
          fields={fields}
          onCreate={(input) => this.create(input)}
          onUpdate={(input) => this.update(input, input._id)}
          onDelete={(input) => this.delete(input._id)}
        />
      </Fragment>
    )
  }
}
