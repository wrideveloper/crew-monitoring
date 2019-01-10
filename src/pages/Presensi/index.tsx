import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { MiniclassService } from "../../services/MiniclassService"
import { PresensiService } from "../../services/PresensiService"

interface IState {
  presensi: IPresensi[]
  miniclass: IMiniclass[]
}

const fields: IField[] = [
  {
    name: "tanggal",
    label: "Tanggal",
    type: "date",
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
    name: "topik",
    label: "Topik",
  },
  {
    name: "angkatan",
    label: "Angkatan",
  },
]

export default class Presensi extends Component<{}, IState> {
  public state: IState = {
    presensi: [],
    miniclass: [],
  }

  public presensiService = new PresensiService()
  public miniclassService = new MiniclassService()

  public setOptionsData() {
    fields[1].optionData!.data = this.state.miniclass
  }

  public componentDidMount() {
    this.getMiniclass()
    this.getPresensi()
  }

  public getMiniclass() {
    this.miniclassService.get().then((miniclass) => this.setState({ miniclass }))
  }

  public getPresensi() {
    this.presensiService.get().then((presensi) => this.setState({ presensi }))
  }

  public async createPresensi(input: IPresensiInput) {
    await this.presensiService.create(input)
    this.getPresensi()
  }

  public async updatePresensi(input: IPresensiInput, id: string) {
    await this.presensiService.update(input, id)
    this.getPresensi()
  }

  public deletePresensi(id: string) {
    this.presensiService.delete(id).then(() => this.getPresensi())
  }

  public isUpdateMode(presensi: IPresensi) {
    return presensi._id
  }

  public renderAdditionalAction(presensi: IPresensi) {
    return this.isUpdateMode(presensi) ? (
      <Link to={`/presensi/${presensi._id}`}>
        <Button content="Checkin" color="orange" />
      </Link>
    ) : null
  }

  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header
          content="Presensi"
          subheader="Kumpulan data presensi miniclass"
        />
        <DataTable<IPresensi, IPresensiInput>
          data={this.state.presensi}
          fields={fields}
          onCreate={(input) => this.createPresensi(input)}
          onUpdate={(input) => this.updatePresensi(input, input._id)}
          onDelete={(input) => this.deletePresensi(input._id)}
          additionalAction={(presensi) => this.renderAdditionalAction(presensi)}
        />
      </Fragment>
    )
  }
}
