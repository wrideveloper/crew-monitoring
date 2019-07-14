import {
  Container,
  CreateButton,
  Form,
  ISchema,
  Table,
  Validation,
} from "crudone"
import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { JabatanService } from "../../services/JabatanService"

interface IState {
  jabatan: IJabatan[]
  loading: boolean
  error?: Error
}

export default class Jabatan extends Component<{}, IState> {
  public state: IState = {
    jabatan: [],
    loading: false,
  }

  public jabatanService = new JabatanService()

  public componentDidMount() {
    this.getJabatan()
  }

  public getJabatan = () => {
    this.setState({ loading: true })
    this.jabatanService
      .get()
      .then((jabatan) => this.setState({ jabatan }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createJabatan = (input: IJabatan) => {
    this.setState({ loading: true })
    this.jabatanService
      .create(input)
      .then(this.getJabatan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateJabatan = (input: IJabatan) => {
    this.setState({ loading: true })
    this.jabatanService
      .update(input, input._id)
      .then(this.getJabatan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteJabatan = (input: IJabatan) => {
    this.setState({ loading: true })
    this.jabatanService
      .delete(input._id)
      .then(this.getJabatan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama Jabatan",
        validations: [Validation.required],
      },
    }

    return (
      <Fragment>
        <Header content="Jabatan" subheader="Kumpulan data jabatan" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.jabatan}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Jabatan"
            updateTitle="Ubah Jabatan"
            onCreate={this.createJabatan}
            onUpdate={this.updateJabatan}
            onDelete={this.deleteJabatan}
          />
        </Container>
      </Fragment>
    )
  }
}
