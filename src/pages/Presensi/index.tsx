import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { MiniclassService } from "../../services/MiniclassService"
import { PresensiService } from "../../services/PresensiService"

interface IState {
  presensi: IPresensi[]
  miniclass: IMiniclass[]
  loading: boolean
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
      textKey: "nama",
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
    loading: false,
  }

  public presensiService = new PresensiService()
  public miniclassService = new MiniclassService()

  public componentDidMount() {
    this.getMiniclass()
    this.getPresensi()
  }

  public getMiniclass() {
    this.miniclassService.get().then((miniclass) => this.setState({ miniclass }))
  }

  public async getPresensi() {
    this.setState({ loading: true })
    const presensi = await this.presensiService.get()
    this.setState({ presensi, loading: false })
  }

  public async createPresensi(input: IPresensi) {
    this.setState({ loading: true })
    await this.presensiService.create(input)
    this.getPresensi()
  }

  public async updatePresensi(input: IPresensi, id: string) {
    this.setState({ loading: true })
    await this.presensiService.update(input, id)
    this.getPresensi()
  }

  public async deletePresensi(id: string) {
    this.setState({ loading: true })
    await this.presensiService.delete(id)
    this.getPresensi()
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

  public setOptionsData() {
    fields[1].optionData!.data = this.state.miniclass
  }

  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header
          content="Presensi"
          subheader="Kumpulan data presensi miniclass"
        />
        <DataTable<IPresensi>
          data={this.state.presensi}
          loading={this.state.loading}
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
