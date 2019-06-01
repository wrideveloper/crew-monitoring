import React, { Component, Fragment } from "react"
import { RouteComponentProps } from "react-router"
import { Button, Grid, Header } from "semantic-ui-react"
import Table from "../../components/DataTable/Table"
import ErrorMessage from "../../components/ErrorMessage"
import { AnggotaService } from "../../services/AnggotaService"
import { PresensiService } from "../../services/PresensiService"
import CardInfo from "./CardInfo"

interface IState {
  presensi: IPresensi
  anggota: IAnggota[]
  loading: boolean
  error?: Error
}

export default class Checkin extends Component<RouteComponentProps, IState> {
  public state: IState = {
    presensi: JSON.parse(localStorage.getItem("presensi")!) as IPresensi,
    anggota: [],
    loading: false,
  }

  public presensiService = new PresensiService()
  public anggotaService = new AnggotaService()

  public getAnggota() {
    this.setState({ loading: true })
    this.anggotaService
      .get()
      .then((anggota) => this.setState({ anggota }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public componentDidMount() {
    this.getAnggota()
  }

  public submit = () => {
    this.setState({ loading: true })
    this.presensiService
      .update(this.state.presensi, this.state.presensi._id)
      .then(() => this.props.history.push("/presensi"))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public addPeserta(anggota: IAnggota) {
    const { presensi } = this.state
    presensi.peserta.push(anggota._id)
    this.setState({ presensi })
  }

  public removePeserta(anggota: IAnggota) {
    const { presensi } = this.state
    presensi.peserta = presensi.peserta.filter((id) => id !== anggota._id)
    this.setState({ presensi })
  }

  public checkIn = (anggota: IAnggota) => {
    if (this.isAttend(anggota)) {
      this.removePeserta(anggota)
    } else {
      this.addPeserta(anggota)
    }
  }

  public isAttend(anggota: IAnggota) {
    return (
      this.state.presensi.peserta.filter((id) => id === anggota._id).length > 0
    )
  }

  public isAngkatanMatch(anggota: IAnggota) {
    return anggota.angkatan === this.state.presensi.angkatan
  }

  public isMiniclassMatch(anggota: IAnggota) {
    return anggota.miniclass!._id === this.state.presensi.miniclass._id
  }

  public getAnggotaMiniclass() {
    return this.state.anggota
      .filter((item) => this.isMiniclassMatch(item) && this.isAngkatanMatch(item))
      .map((item) => ({ ...item, hadir: this.isAttend(item) ? "Ya" : "Tidak" }))
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
          <Grid.Column width="10">
            <Table
              loading={this.state.loading}
              data={this.getAnggotaMiniclass()}
              onRowClick={this.checkIn}
              fields={[
                {
                  name: "nama",
                  label: "Nama",
                },
                {
                  name: "hadir",
                  label: "Hadir",
                },
              ]}
            />
            <Button color="green" content="Simpan" onClick={this.submit} />
          </Grid.Column>
          <Grid.Column width="6">
            <CardInfo presensi={this.state.presensi} />
          </Grid.Column>
        </Grid>
      </Fragment>
    )
  }
}
