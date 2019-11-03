import { Container, ISchema, Table } from "crudone"
import React, { Component, Fragment } from "react"
import { RouteComponentProps } from "react-router"
import { Button, Grid, Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { MiniclassService } from "../../services/MiniclassService"
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
    presensi: this.props.location.state,
    anggota: [],
    loading: false,
  }

  public presensiService = new PresensiService()
  public miniclassService = new MiniclassService()

  public componentDidMount() {
    this.getAnggota()
  }

  public getAnggota() {
    const { miniclass, angkatan } = this.state.presensi
    this.setState({ loading: true })
    this.miniclassService
      .getAnggota(miniclass._id, angkatan)
      .then((anggota) => this.setState({ anggota: this.mapAnggota(anggota) }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public mapAnggota(anggota: IAnggota[]) {
    return anggota.map((item) => ({
      ...item,
      hadir: this.isAttend(item) ? "Ya" : "Tidak",
    }))
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
    console.log("add peserta")
    const { presensi } = this.state
    presensi.peserta.push(anggota._id)
    this.setState({ presensi })
  }

  public removePeserta(anggota: IAnggota) {
    console.log("remove peserta")
    const { presensi } = this.state
    presensi.peserta = presensi.peserta.filter((id) => id !== anggota._id)
    this.setState({ presensi })
  }

  public checkIn = (anggota: IAnggota) => {
    console.log(anggota)
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

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama",
      },
      hadir: {
        label: "Hadir",
      },
    }
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
            <Container schema={schema}>
              <Table.Container
                data={this.mapAnggota(this.state.anggota)}
                loading={this.state.loading}
              >
                <Table.Display
                  emptyText="Data Kosong"
                  onRowClick={this.checkIn}
                />
              </Table.Container>
            </Container>
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
