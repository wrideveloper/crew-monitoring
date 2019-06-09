import React, { Component, Fragment } from "react"
import { RouteComponentProps } from "react-router"
import { Button, Header } from "semantic-ui-react"
import { Container, ISchema, Table } from "../../components/crudone"
import ErrorMessage from "../../components/ErrorMessage"
import { routes } from "../../config"
import { LevelService } from "../../services/LevelService"

interface IState {
  level: ILevel
  routes: IRoute[]
  loading: boolean
  error?: Error
}

export default class HakAkses extends Component<RouteComponentProps, IState> {
  public state: IState = {
    level: JSON.parse(localStorage.getItem("level")!) as ILevel,
    routes,
    loading: false,
  }

  public levelService = new LevelService()

  public submit = () => {
    this.setState({ loading: true })
    this.levelService
      .update(this.state.level, this.state.level._id)
      .then(() => this.props.history.push("/admin/level"))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public addHakAkses(hakAkses: string) {
    const { level } = this.state
    level.hakAkses.push(hakAkses)
    this.setState({ level })
  }

  public removeHakAkses(hakAkses: string) {
    const { level } = this.state
    level.hakAkses = level.hakAkses.filter((item) => item !== hakAkses)
    this.setState({ level })
  }

  public isExist(hakAkses: string) {
    return (
      this.state.level.hakAkses.filter((item) => item === hakAkses).length > 0
    )
  }

  public toggle = (route: IRoute) => {
    if (this.isExist(route.name)) {
      this.removeHakAkses(route.name)
    } else {
      this.addHakAkses(route.name)
    }
  }

  public getModule() {
    return this.state.routes
      .filter((route) => route.private)
      .map((route) => ({
        ...route,
        hakAkses: this.isExist(route.name) ? "Ya" : "Tidak",
      }))
  }

  public render() {
    const schema: ISchema = {
      label: {
        label: "Nama Modul",
      },
      hakAkses: {
        label: "Boleh Diakses",
      },
    }
    return (
      <Fragment>
        <Header
          content="Hak Akses"
          subheader="Daftar modul yang boleh diakses"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <Table.Container data={this.getModule()} loading={this.state.loading}>
            <Table.Search />
            <Table.Display emptyText="Data Kosong" onRowClick={this.toggle} />
          </Table.Container>
        </Container>
        <Button color="green" content="Simpan" onClick={this.submit} />
      </Fragment>
    )
  }
}
