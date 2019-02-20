import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { MiniclassService } from "../../services/MiniclassService"
import { PresensiService } from "../../services/PresensiService"

interface IState {
  presensi: IPresensi[]
  miniclass: IMiniclass[]
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
  {
    name: "topik",
    label: "Topik",
    validations: ["required"],
  },
  {
    name: "angkatan",
    label: "Angkatan",
    validations: ["required", "numeric"],
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

  public getPresensi() {
    this.setState({ loading: true })
    this.presensiService
      .get()
      .then((presensi) => this.setState({ presensi }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createPresensi(input: IPresensi) {
    this.setState({ loading: true })
    this.presensiService
      .create(input)
      .then(() => this.getPresensi())
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public updatePresensi(input: IPresensi, id: string) {
    this.setState({ loading: true })
    this.presensiService
      .update(input, id)
      .then(() => this.getPresensi())
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public deletePresensi(id: string) {
    this.setState({ loading: true })
    this.presensiService
      .delete(id)
      .then(() => this.getPresensi())
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public renderAdditionalAction(presensi: IPresensi) {
    return presensi._id ? (
      <Link to={`/presensi/checkin`}>
        <Button
          content="Checkin"
          color="orange"
          onClick={() =>
            localStorage.setItem("presensi", JSON.stringify(presensi))
          }
        />
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
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
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
