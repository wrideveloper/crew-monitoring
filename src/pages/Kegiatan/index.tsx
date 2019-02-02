import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { KategoriKegiatanService } from "../../services/KategoriKegiatanService"
import { KegiatanService } from "../../services/KegiatanService"

interface IState {
  kegiatan: IKegiatan[]
  kategoriKegiatan: IKategoriKegiatan[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "tanggal",
    label: "Tanggal",
    type: "date",
    validations: ["required"],
  },
  {
    name: "nama",
    label: "Nama",
    validations: ["required"],
  },
  {
    name: "kategoriKegiatan",
    label: "Kategori",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "nama",
      valueKey: "_id",
    },
  },
  {
    name: "laporan",
    label: "Laporan",
    validations: ["required"],
    hide: true,
  },
]

export default class Kegiatan extends Component<{}, IState> {
  public state: IState = {
    kegiatan: [],
    kategoriKegiatan: [],
    loading: false,
  }

  public kegiatanService = new KegiatanService()
  public kategoriKegiatanService = new KategoriKegiatanService()

  public componentDidMount() {
    this.getKategoriKegiatan()
    this.getKegiatan()
  }

  public getKategoriKegiatan() {
    this.kategoriKegiatanService.get().then((kategoriKegiatan) => this.setState({ kategoriKegiatan }))
  }

  public getKegiatan() {
    this.setState({ loading: true })
    this.kegiatanService
      .get()
      .then((kegiatan) => this.setState({ kegiatan }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createKegiatan(input: IKegiatan) {
    this.setState({ loading: true })
    this.kegiatanService
      .create(input)
      .then(() => this.getKegiatan())
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public updateKegiatan(input: IKegiatan, id: string) {
    this.setState({ loading: true })
    this.kegiatanService
      .update(input, id)
      .then(() => this.getKegiatan())
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public deleteKegiatan(id: string) {
    this.setState({ loading: true })
    this.kegiatanService
      .delete(id)
      .then(() => this.getKegiatan())
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public setOptionsData() {
    fields[2].optionData!.data = this.state.kategoriKegiatan
  }

  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header content="Kegiatan" subheader="Kumpulan data kegiatan" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IKegiatan>
          data={this.state.kegiatan}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createKegiatan(input)}
          onUpdate={(input) => this.updateKegiatan(input, input._id)}
          onDelete={(input) => this.deleteKegiatan(input._id)}
        />
      </Fragment>
    )
  }
}
