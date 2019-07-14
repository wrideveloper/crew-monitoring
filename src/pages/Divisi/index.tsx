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
import { DivisiService } from "../../services/DivisiService"

interface IState {
  divisi: IDivisi[]
  loading: boolean
  error?: Error
}

export default class Divisi extends Component<{}, IState> {
  public state: IState = {
    divisi: [],
    loading: false,
  }

  public divisiService = new DivisiService()

  public componentDidMount() {
    this.getDivisi()
  }

  public getDivisi = () => {
    this.setState({ loading: true })
    this.divisiService
      .get()
      .then((divisi) => this.setState({ divisi }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createDivisi = (input: IDivisi) => {
    this.setState({ loading: true })
    this.divisiService
      .create(input)
      .then(this.getDivisi)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateDivisi = (input: IDivisi) => {
    this.setState({ loading: true })
    this.divisiService
      .update(input, input._id)
      .then(this.getDivisi)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteDivisi = (input: IDivisi) => {
    this.setState({ loading: true })
    this.divisiService
      .delete(input._id)
      .then(this.getDivisi)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama Divisi",
        validations: [Validation.required, Validation.alpha],
      },
    }

    return (
      <Fragment>
        <Header content="Divisi" subheader="Kumpulan data divisi" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.divisi}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Divisi"
            updateTitle="Ubah Divisi"
            onCreate={this.createDivisi}
            onUpdate={this.updateDivisi}
            onDelete={this.deleteDivisi}
          />
        </Container>
      </Fragment>
    )
  }
}
