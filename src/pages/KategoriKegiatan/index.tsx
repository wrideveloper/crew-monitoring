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

export default class KategoriKegiatan extends Component<{}, IState> {
  public state: IState = {
    kategoriKegiatan: [],
    loading: false,
  }

  public kategoriKegiatanService = new KategoriKegiatanService()

  public componentDidMount() {
    this.getKategoriKegiatan()
  }

  public getKategoriKegiatan = () => {
    this.setState({ loading: true })
    this.kategoriKegiatanService
      .get()
      .then((kategoriKegiatan) => this.setState({ kategoriKegiatan }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createKategoriKegiatan = (input: IKategoriKegiatan) => {
    this.setState({ loading: true })
    this.kategoriKegiatanService
      .create(input)
      .then(this.getKategoriKegiatan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateKategoriKegiatan = (input: IKategoriKegiatan) => {
    this.setState({ loading: true })
    this.kategoriKegiatanService
      .update(input, input._id)
      .then(this.getKategoriKegiatan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteKategoriKegiatan = (input: IKategoriKegiatan) => {
    this.setState({ loading: true })
    this.kategoriKegiatanService
      .delete(input._id)
      .then(this.getKategoriKegiatan)
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
          onCreate={this.createKategoriKegiatan}
          onUpdate={this.updateKategoriKegiatan}
          onDelete={this.deleteKategoriKegiatan}
          fields={[
            {
              name: "nama",
              label: "Nama Kategori",
              validations: ["required"],
            },
            {
              name: "keterangan",
              label: "Keterangan",
              validations: ["required"],
            },
          ]}
        />
      </Fragment>
    )
  }
}
