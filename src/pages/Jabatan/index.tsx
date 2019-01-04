import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import {
  createJabatan,
  deleteJabatan,
  getJabatan,
  updateJabatan,
} from "./service"

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

  public componentDidMount() {
    this.get()
  }

  public get() {
    getJabatan().then((jabatan) =>
      this.setState({ jabatan: jabatan as IJabatan[] }),
    )
  }

  public create(input: IJabatan) {
    createJabatan(input).then(() => this.get())
  }

  public update(input: IJabatan, id: string) {
    updateJabatan(input, id).then(() => this.get())
  }

  public delete(id: string) {
    deleteJabatan(id).then(() => this.get())
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
