import React, { Component, Fragment } from "react"
import { RouteComponentProps } from "react-router"
import { Grid, Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { AnggotaService } from "../../services/AnggotaService"
import { PresensiService } from "../../services/PresensiService"
import CardInfo from "./CardInfo"
import CardPresent from "./CardPresent"

interface IMatchParams {
  id: string
}
interface IProps extends RouteComponentProps<IMatchParams> {}

interface IState {
  presensi: IPresensi
  anggota: IAnggota[]
  loading: boolean
  error?: Error
}

export default class Checkin extends Component<IProps, IState> {
  public state: IState = {
    presensi: {
      _id: "",
      angkatan: 0,
      peserta: [],
      tanggal: new Date(),
      topik: "",
      miniclass: {
        _id: "",
        divisi: {
          _id: "",
          nama: "",
        },
        nama: "",
      },
    },
    anggota: [],
    loading: false,
  }

  public presensiService = new PresensiService()
  public anggotaService = new AnggotaService()

  public componentDidMount() {
    this.getAnggota()
    this.getPresensi()
  }

  public getAnggota() {
    this.anggotaService.get().then((anggota) => this.setState({ anggota }))
  }

  public getPresensi() {
    this.setState({ loading: true })
    const { id } = this.props.match.params
    this.presensiService
      .getById(id)
      .then((presensi) => this.setState({ presensi }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public addPeserta(id: string) {
    const { presensi } = this.state
    presensi.peserta.push(id)
    this.setState({ presensi })
  }

  public removePeserta(id: string) {
    const { presensi } = this.state
    presensi.peserta = presensi.peserta.filter((item) => item !== id)
    this.setState({ presensi })
  }

  public changePeserta(id: string, checked: boolean) {
    if (checked) this.addPeserta(id)
    else this.removePeserta(id)
  }

  public submit() {
    this.setState({ loading: true })
    this.presensiService
      .update(this.state.presensi, this.state.presensi._id)
      .then(() => this.props.history.push("/presensi"))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header
          content="Checkin"
          subheader="Daftar kedatangan peserta miniclass"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Grid columns="2">
          <Grid.Column>
            <CardPresent
              presensi={this.state.presensi}
              anggota={this.state.anggota}
              loading={this.state.loading}
              onChange={(id, checked) => this.changePeserta(id, checked)}
              onSubmit={() => this.submit()}
            />
          </Grid.Column>
          <Grid.Column>
            <CardInfo
              presensi={this.state.presensi}
              loading={this.state.loading}
            />
          </Grid.Column>
        </Grid>
      </Fragment>
    )
  }
}
