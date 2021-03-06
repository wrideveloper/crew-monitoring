import { Container, CreateButton, Form, ISchema, Table } from "crudone"
import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { AnggotaService } from "../../services/AnggotaService"
import { NomorSuratService } from "../../services/NomorSuratService"

interface IState {
  nomorSurat: INomorSurat[]
  anggota: IAnggota[]
  loading: boolean
  error?: Error
}

export default class NomorSurat extends Component<{}, IState> {
  public state: IState = {
    nomorSurat: [],
    anggota: [],
    loading: false,
  }

  public nomorSuratService = new NomorSuratService()
  public anggotaService = new AnggotaService()

  public componentDidMount() {
    this.getNomorSurat()
    this.getAnggota()
  }

  public getAnggota() {
    this.anggotaService.get().then((anggota) => this.setState({ anggota }))
  }

  public getNomorSurat = () => {
    this.setState({ loading: true })
    this.nomorSuratService
      .get()
      .then((nomorSurat) => this.setState({ nomorSurat }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createNomorSurat = (input: INomorSurat) => {
    this.setState({ loading: true })
    this.nomorSuratService
      .create(input)
      .then(this.getNomorSurat)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateNomorSurat = (input: INomorSurat) => {
    this.setState({ loading: true })
    this.nomorSuratService
      .update(input, input._id)
      .then(this.getNomorSurat)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteNomorSurat = (input: INomorSurat) => {
    this.setState({ loading: true })
    this.nomorSuratService
      .delete(input._id)
      .then(this.getNomorSurat)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nomor: {
        label: "Nomor Surat",
        validations: ["required"],
      },
      keperluan: {
        label: "Keperluan",
        validations: ["required"],
      },
      anggota: {
        label: "Pemohon",
        type: "option",
        validations: ["required"],
        optionData: {
          data: this.state.anggota,
          textKey: "nama",
          valueKey: "_id",
        },
      },
    }

    return (
      <Fragment>
        <Header
          content="Nomor Surat"
          subheader="Kumpulan data nomor pengeluaran surat. Format : Nomor/Acara/Instansi/Bulan/Tahun"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.nomorSurat}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Nomor Surat"
            updateTitle="Ubah Nomor Surat"
            onCreate={this.createNomorSurat}
            onUpdate={this.updateNomorSurat}
            onDelete={this.deleteNomorSurat}
          />
        </Container>
      </Fragment>
    )
  }
}
