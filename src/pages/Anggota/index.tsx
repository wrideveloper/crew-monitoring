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
import { AnggotaService } from "../../services/AnggotaService"
import { DivisiService } from "../../services/DivisiService"
import { JabatanService } from "../../services/JabatanService"
import { MiniclassService } from "../../services/MiniclassService"

interface IState {
  anggota: IAnggota[]
  jabatan: IJabatan[]
  divisi: IDivisi[]
  miniclass: IMiniclass[]
  loading: boolean
  error?: Error
}

export default class Anggota extends Component<{}, IState> {
  public state: IState = {
    anggota: [],
    jabatan: [],
    divisi: [],
    miniclass: [],
    loading: false,
  }

  public anggotaService = new AnggotaService()
  public jabatanService = new JabatanService()
  public divisiService = new DivisiService()
  public miniclassService = new MiniclassService()

  public componentDidMount() {
    this.getAnggota()
    this.getDivisi()
    this.getJabatan()
    this.getMiniclass()
  }

  public getDivisi() {
    this.divisiService.get().then((divisi) => this.setState({ divisi }))
  }

  public getJabatan() {
    this.jabatanService.get().then((jabatan) => this.setState({ jabatan }))
  }

  public getMiniclass() {
    this.miniclassService.get().then((miniclass) => this.setState({ miniclass }))
  }

  public getAnggota = () => {
    this.setState({ loading: true })
    this.anggotaService
      .get()
      .then((anggota) => this.setState({ anggota }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createAnggota = (input: IAnggota) => {
    this.setState({ loading: true })
    this.anggotaService
      .create(input)
      .then(this.getAnggota)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateAnggota = (input: IAnggota) => {
    this.setState({ loading: true })
    this.anggotaService
      .update(input, input._id)
      .then(this.getAnggota)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteAnggota = (input: IAnggota) => {
    this.setState({ loading: true })
    this.anggotaService
      .delete(input._id)
      .then(this.getAnggota)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nim: {
        label: "NIM",
        validations: [Validation.required, Validation.numeric],
      },
      nama: {
        label: "Nama",
        validations: [Validation.required],
      },
      email: {
        label: "Email",
        validations: [Validation.email],
        hideOnTable: true,
      },
      kontak: {
        label: "Kontak",
        validations: [Validation.numeric],
        hideOnTable: true,
      },
      angkatan: {
        label: "Angkatan",
        validations: [Validation.required, Validation.numeric],
      },
      jabatan: {
        label: "Jabatan",
        hideOnTable: true,
        type: "option",
        optionData: {
          data: this.state.jabatan,
          textKey: "nama",
          valueKey: "_id",
        },
      },
      divisi: {
        label: "Divisi",
        type: "option",
        optionData: {
          data: this.state.divisi,
          textKey: "nama",
          valueKey: "_id",
        },
      },
      miniclass: {
        label: "Miniclass",
        type: "option",
        optionData: {
          data: this.state.miniclass,
          textKey: "nama",
          valueKey: "_id",
        },
      },
    }

    return (
      <Fragment>
        <Header content="Anggota" subheader="Kumpulan data anggota crew" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.anggota}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Anggota"
            updateTitle="Ubah Anggota"
            onCreate={this.createAnggota}
            onUpdate={this.updateAnggota}
            onDelete={this.deleteAnggota}
          />
        </Container>
      </Fragment>
    )
  }
}
