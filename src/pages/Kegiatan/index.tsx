import {
  Container,
  CreateButton,
  Form,
  ISchema,
  Table,
  Validation,
} from "crudone"
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Grid, Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { KategoriKegiatanService } from "../../services/KategoriKegiatanService"
import { KegiatanService } from "../../services/KegiatanService"

interface IState {
  kegiatan: IKegiatan[]
  kategoriKegiatan: IKategoriKegiatan[]
  loading: boolean
  error?: Error
}

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
    this.kategoriKegiatanService
      .get()
      .then((kategoriKegiatan) => this.setState({ kategoriKegiatan }))
  }

  public getKegiatan = () => {
    this.setState({ loading: true })
    this.kegiatanService
      .get()
      .then((kegiatan) => this.setState({ kegiatan }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createKegiatan = (input: IKegiatan) => {
    this.setState({ loading: true })
    this.kegiatanService
      .create(input)
      .then(this.getKegiatan)
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public updateKegiatan = (input: IKegiatan) => {
    this.setState({ loading: true })
    this.kegiatanService
      .update(input, input._id)
      .then(this.getKegiatan)
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public deleteKegiatan = (input: IKegiatan) => {
    this.setState({ loading: true })
    this.kegiatanService
      .delete(input._id)
      .then(this.getKegiatan)
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public render() {
    const schema: ISchema = {
      tanggal: {
        label: "Tanggal",
        type: "date",
        validations: [Validation.required],
      },
      nama: {
        label: "Nama",
        validations: [Validation.required],
      },
      kategoriKegiatan: {
        label: "Kategori",
        type: "option",
        validations: [Validation.required],
        optionData: {
          data: this.state.kategoriKegiatan,
          textKey: "nama",
          valueKey: "_id",
        },
      },
      album: {
        label: "Album",
        hideOnTable: true,
      },
      laporan: {
        label: "Laporan",
        hideOnTable: true,
      },
    }

    return (
      <Fragment>
        <Grid style={styles.headerContainer}>
          <Grid.Column width="8">
            <Header content="Kegiatan" subheader="Kumpulan data kegiatan" />
          </Grid.Column>
          <Grid.Column width="8" textAlign="right">
            <Link to="/kegiatan/kategori">
              <Button content="Kategori Kegiatan" color="blue" />
            </Link>
          </Grid.Column>
        </Grid>

        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.kegiatan}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Kegiatan"
            updateTitle="Ubah Kegiatan"
            onCreate={this.createKegiatan}
            onUpdate={this.updateKegiatan}
            onDelete={this.deleteKegiatan}
          />
        </Container>
      </Fragment>
    )
  }
}

const styles = {
  headerContainer: {
    marginBottom: 5,
  },
}
