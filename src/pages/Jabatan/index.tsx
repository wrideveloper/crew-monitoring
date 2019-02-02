import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { JabatanService } from "../../services/JabatanService"

interface IState {
  jabatan: IJabatan[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "nama",
    label: "Nama Jabatan",
    validations: ["required"],
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

  public getJabatan() {
    this.setState({ loading: true })
    this.jabatanService
      .get()
      .then((jabatan) => this.setState({ jabatan }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createJabatan(input: IJabatan) {
    this.setState({ loading: true })
    this.jabatanService
      .create(input)
      .then(() => this.getJabatan())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateJabatan(input: IJabatan, id: string) {
    this.setState({ loading: true })
    this.jabatanService
      .update(input, id)
      .then(() => this.getJabatan())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteJabatan(id: string) {
    this.setState({ loading: true })
    this.jabatanService
      .delete(id)
      .then(() => this.getJabatan())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Jabatan" subheader="Kumpulan data jabatan" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
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
