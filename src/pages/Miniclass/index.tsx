import { Container, CreateButton, Form, ISchema, Table } from "crudone"
import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { DivisiService } from "../../services/DivisiService"
import { MiniclassService } from "../../services/MiniclassService"

interface IState {
  miniclass: IMiniclass[]
  divisi: IDivisi[]
  loading: boolean
  error?: Error
}

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

  public getMiniclass = () => {
    this.setState({ loading: true })
    this.miniclassService
      .get()
      .then((miniclass) => this.setState({ miniclass }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createMiniclass = (input: IMiniclass) => {
    this.setState({ loading: true })
    this.miniclassService
      .create(input)
      .then(this.getMiniclass)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateMiniclass = (input: IMiniclass) => {
    this.setState({ loading: true })
    this.miniclassService
      .update(input, input._id)
      .then(this.getMiniclass)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteMiniclass = (input: IMiniclass) => {
    this.setState({ loading: true })
    this.miniclassService
      .delete(input._id)
      .then(this.getMiniclass)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama Miniclass",
        validations: ["required"],
      },
      divisi: {
        label: "Divisi",
        type: "option",
        validations: ["required"],
        optionData: {
          data: this.state.divisi,
          textKey: "nama",
          valueKey: "_id",
        },
      },
    }

    return (
      <Fragment>
        <Header content="Miniclass" subheader="Kumpulan data miniclass" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.miniclass}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Miniclass"
            updateTitle="Ubah Miniclass"
            onCreate={this.createMiniclass}
            onUpdate={this.updateMiniclass}
            onDelete={this.deleteMiniclass}
          />
        </Container>
      </Fragment>
    )
  }
}
