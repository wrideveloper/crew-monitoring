import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { KategoriKegiatanService } from "../../services/KategoriKegiatanService"

interface IState {
  kategoriKegiatan: IKategoriKegiatan[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "nama",
    label: "Nama Kategori",
  },
]

export default class KategoriKegiatan extends Component<{}, IState> {
  public state: IState = {
    kategoriKegiatan: [],
    loading: false,
  }

  public kategoriKegiatanService = new KategoriKegiatanService()

  public componentDidMount() {
    this.getKategoriKegiatan()
  }

  public getKategoriKegiatan() {
    this.setState({ loading: true })
    this.kategoriKegiatanService
      .get()
      .then((kategoriKegiatan) => this.setState({ kategoriKegiatan }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createKategoriKegiatan(input: IKategoriKegiatan) {
    this.setState({ loading: true })
    this.kategoriKegiatanService
      .create(input)
      .then(() => this.getKategoriKegiatan())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateKategoriKegiatan(input: IKategoriKegiatan, id: string) {
    this.setState({ loading: true })
    this.kategoriKegiatanService
      .update(input, id)
      .then(() => this.getKategoriKegiatan())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public async deleteKategoriKegiatan(id: string) {
    this.setState({ loading: true })
    this.kategoriKegiatanService
      .delete(id)
      .then(() => this.getKategoriKegiatan())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header
          content="Kategori Kegiatan"
          subheader="Kumpulan data Kategori Kegiatan"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IKategoriKegiatan>
          data={this.state.kategoriKegiatan}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createKategoriKegiatan(input)}
          onUpdate={(input) => this.updateKategoriKegiatan(input, input._id)}
          onDelete={(input) => this.deleteKategoriKegiatan(input._id)}
        />
      </Fragment>
    )
  }
}
