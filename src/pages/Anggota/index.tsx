import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { AnggotaService } from "../../services/AnggotaService"
import { DivisiService } from "../../services/DivisiService"
import { JabatanService } from "../../services/JabatanService"
import { MiniclassService } from "../../services/MiniclassService"

interface IState {
  anggota: IAnggota[]
  jabatan: IJabatan[]
  divisi: IDivisi[]
  miniclass: IMiniclass[]
}

const fields: IField[] = [
  {
    name: "nim",
    label: "NIM",
    type: "number",
  },
  {
    name: "nama",
    label: "Nama",
  },
  {
    name: "email",
    label: "Email",
    hide: true,
  },
  {
    name: "kontak",
    label: "Kontak",
    hide: true,
  },
  {
    name: "angkatan",
    label: "Angkatan",
    type: "number",
  },
  {
    name: "jabatan",
    label: "Jabatan",
    hide: true,
    type: "option",
    optionData: {
      data: [],
      labelKey: "nama",
      valueKey: "_id",
    },
  },
  {
    name: "divisi",
    label: "Divisi",
    type: "option",
    optionData: {
      data: [],
      labelKey: "nama",
      valueKey: "_id",
    },
  },
  {
    name: "miniclass",
    label: "Miniclass",
    type: "option",
    optionData: {
      data: [],
      labelKey: "nama",
      valueKey: "_id",
    },
  },
  {
    name: "foto",
    label: "Foto",
    type: "image",
    hide: true,
  },
]

export default class Anggota extends Component<{}, IState> {
  public state: IState = {
    anggota: [],
    jabatan: [],
    divisi: [],
    miniclass: [],
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
    this.anggotaService.get().then((anggota) => this.setState({ anggota }))
  }

  public async createAnggota(input: IAnggota) {
    const { _id } = await this.anggotaService.create(input)
    if (input.foto instanceof File)
      await this.anggotaService.uploadFoto(input.foto as File, _id)
    this.getAnggota()
  }

  public async updateAnggota(input: IAnggota, id: string) {
    await this.anggotaService.update(input, id)
    if (input.foto instanceof File)
      await this.anggotaService.uploadFoto(input.foto as File, id)
    this.getAnggota()
  }

  public deleteAnggota(id: string) {
    this.anggotaService.delete(id).then(() => this.getAnggota())
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
        <DataTable<IAnggota>
          data={this.state.anggota}
          fields={fields}
          onCreate={(input) => this.createAnggota(input)}
          onUpdate={(input) => this.updateAnggota(input, input._id)}
          onDelete={(input) => this.deleteAnggota(input._id)}
        />
      </Fragment>
    )
  }
}
