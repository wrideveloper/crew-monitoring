import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import {
  Container,
  CreateButton,
  Form,
  ISchema,
  Table,
} from "../../components/crudone"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { MiniclassService } from "../../services/MiniclassService"
import { PresensiService } from "../../services/PresensiService"

interface IState {
  presensi: IPresensi[]
  miniclass: IMiniclass[]
  loading: boolean
  error?: Error
}

export default class Presensi extends Component<{}, IState> {
  public state: IState = {
    presensi: [],
    miniclass: [],
    loading: false,
  }

  public presensiService = new PresensiService()
  public miniclassService = new MiniclassService()

  public componentDidMount() {
    this.getMiniclass()
    this.getPresensi()
  }

  public getMiniclass() {
    this.miniclassService.get().then((miniclass) => this.setState({ miniclass }))
  }

  public getPresensi = () => {
    this.setState({ loading: true })
    this.presensiService
      .get()
      .then((presensi) => this.setState({ presensi }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createPresensi = (input: IPresensi) => {
    this.setState({ loading: true })
    this.presensiService
      .create(input)
      .then(this.getPresensi)
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public updatePresensi = (input: IPresensi) => {
    this.setState({ loading: true })
    this.presensiService
      .update(input, input._id)
      .then(this.getPresensi)
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public deletePresensi = (input: IPresensi) => {
    this.setState({ loading: true })
    this.presensiService
      .delete(input._id)
      .then(this.getPresensi)
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public renderAdditionalAction(presensi: IPresensi, isUpdateMode: boolean) {
    return isUpdateMode ? (
      <Link to={`/presensi/checkin`}>
        <Button
          content="Checkin"
          color="orange"
          onClick={() =>
            localStorage.setItem("presensi", JSON.stringify(presensi))
          }
        />
      </Link>
    ) : null
  }

  public render() {
    const schema: ISchema = {
      tanggal: {
        label: "Tanggal",
        type: "date",
        validations: ["required"],
      },
      miniclass: {
        label: "Miniclass",
        validations: ["required"],
        type: "option",
        optionData: {
          data: this.state.miniclass,
          textKey: "nama",
          valueKey: "_id",
        },
      },
      topik: {
        label: "Topik",
        validations: ["required"],
      },
      angkatan: {
        label: "Angkatan",
        validations: ["required", "numeric"],
      },
    }

    return (
      <Fragment>
        <Header
          content="Presensi"
          subheader="Kumpulan data presensi miniclass"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.presensi}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Presensi"
            updateTitle="Ubah Presensi"
            onCreate={this.createPresensi}
            onUpdate={this.updatePresensi}
            onDelete={this.deletePresensi}
            additionalAction={this.renderAdditionalAction}
          />
        </Container>
      </Fragment>
    )
  }
}
