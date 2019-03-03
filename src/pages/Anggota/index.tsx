import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
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

const fields: IField[] = [
  {
    name: "nim",
    label: "NIM",
    validations: ["required", "numeric"],
  },
  {
    name: "nama",
    label: "Nama",
    validations: ["required"],
  },
  {
    name: "email",
    label: "Email",
    validations: ["email"],
    hide: true,
  },
  {
    name: "kontak",
    label: "Kontak",
    validations: ["numeric"],
    hide: true,
  },
  {
    name: "angkatan",
    label: "Angkatan",
    validations: ["required", "numeric"],
  },
  {
    name: "jabatan",
    label: "Jabatan",
    hide: true,
    validations: ["required"],
    type: "option",
    optionData: {
      data: [],
      textKey: "nama",
      valueKey: "_id",
    },
  },
  {
    name: "divisi",
    label: "Divisi",
    validations: ["required"],
    type: "option",
    optionData: {
      data: [],
      textKey: "nama",
      valueKey: "_id",
    },
  },
  {
    name: "miniclass",
    label: "Miniclass",
    validations: ["required"],
    type: "option",
    optionData: {
      data: [],
      textKey: "nama",
      valueKey: "_id",
    },
  },
  // {
  //   name: "foto",
  //   label: "Foto",
  //   type: "image",
  //   hide: true,
  // },
]

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

  public getAnggota() {
    this.setState({ loading: true })
    this.anggotaService
      .get()
      .then((anggota) => this.setState({ anggota }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createAnggota(input: IAnggota) {
    this.setState({ loading: true })
    this.anggotaService
      .create(input)
      .then(() => this.getAnggota())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateAnggota(input: IAnggota, id: string) {
    this.setState({ loading: true })
    this.anggotaService
      .update(input, id)
      .then(() => this.getAnggota())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteAnggota(id: string) {
    this.setState({ loading: true })
    this.anggotaService
      .delete(id)
      .then(() => this.getAnggota())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public setOptionsData() {
    fields[5].optionData!.data = this.state.jabatan
    fields[6].optionData!.data = this.state.divisi
    fields[7].optionData!.data = this.state.miniclass
  }

  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header content="Anggota" subheader="Kumpulan data anggota crew" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IAnggota>
          data={this.state.anggota}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createAnggota(input)}
          onUpdate={(input) => this.updateAnggota(input, input._id)}
          onDelete={(input) => this.deleteAnggota(input._id)}
        />
      </Fragment>
    )
  }
}
