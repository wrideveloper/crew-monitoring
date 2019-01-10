import React, { Component, Fragment } from "react"
import { RouteComponentProps } from "react-router"
import { Grid, Header } from "semantic-ui-react"
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
  }

  public presensiService = new PresensiService()
  public anggotaService = new AnggotaService()

  public componentDidMount() {
    this.getPresensi()
  }

  public async getPresensi() {
    const { id } = this.props.match.params
    const presensi = await this.presensiService.getById(id)
    await this.setState({ presensi })
    this.getAnggota()
  }

  public getAnggota() {
    this.anggotaService.get().then((anggota) => this.setState({ anggota }))
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
    this.presensiService
      .update(this.state.presensi as any, this.state.presensi._id)
      .then(() => alert("updated"))
  }

  public render() {
    return (
      <Fragment>
        <Header
          content="Checkin"
          subheader="Daftar kedatangan peserta miniclass"
        />

        <Grid columns="2">
          <Grid.Column>
            <CardPresent
              presensi={this.state.presensi}
              anggota={this.state.anggota}
              onChange={(id, checked) => this.changePeserta(id, checked)}
              onSubmit={() => this.submit()}
            />
          </Grid.Column>
          <Grid.Column>
            <CardInfo presensi={this.state.presensi} />
          </Grid.Column>
        </Grid>
      </Fragment>
    )
  }
}
