import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { DivisiService } from "../../services/DivisiService"

interface IState {
  divisi: IDivisi[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "nama",
    label: "Nama Divisi",
    validations: ["required"],
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

  public getDivisi() {
    this.setState({ loading: true })
    this.divisiService
      .get()
      .then((divisi) => this.setState({ divisi }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createDivisi(input: IDivisi) {
    this.setState({ loading: true })
    this.divisiService
      .create(input)
      .then(() => this.getDivisi())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateDivisi(input: IDivisi, id: string) {
    this.setState({ loading: true })
    this.divisiService
      .update(input, id)
      .then(() => this.getDivisi())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public async deleteDivisi(id: string) {
    this.setState({ loading: true })
    this.divisiService
      .delete(id)
      .then(() => this.getDivisi())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Divisi" subheader="Kumpulan data divisi" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
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
