import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { AnggotaService } from "../../services/AnggotaService"
import { NomorSuratService } from "../../services/NomorSuratService"

interface IState {
  nomorSurat: INomorSurat[]
  anggota: IAnggota[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "nomor",
    label: "Nomor Surat",
    validations: ["required"],
  },
  {
    name: "keperluan",
    label: "Keperluan",
    validations: ["required"],
  },
  {
    name: "anggota",
    label: "Pemohon",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "nama",
      valueKey: "_id",
    },
  },
]

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

  public getNomorSurat() {
    this.setState({ loading: true })
    this.nomorSuratService
      .get()
      .then((nomorSurat) => this.setState({ nomorSurat }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createNomorSurat(input: INomorSurat) {
    this.setState({ loading: true })
    this.nomorSuratService
      .create(input)
      .then(() => this.getNomorSurat())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateNomorSurat(input: INomorSurat, id: string) {
    this.setState({ loading: true })
    this.nomorSuratService
      .update(input, id)
      .then(() => this.getNomorSurat())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteNomorSurat(id: string) {
    this.setState({ loading: true })
    this.nomorSuratService
      .delete(id)
      .then(() => this.getNomorSurat())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public setOptionsData() {
    fields[2].optionData!.data = this.state.anggota
  }

  public render() {
    this.setOptionsData()
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
        <DataTable<INomorSurat>
          data={this.state.nomorSurat}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createNomorSurat(input)}
          onUpdate={(input) => this.updateNomorSurat(input, input._id)}
          onDelete={(input) => this.deleteNomorSurat(input._id)}
        />
      </Fragment>
    )
  }
}