import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Grid, Header } from "semantic-ui-react"
import {
  Container,
  CreateButton,
  Form,
  ISchema,
  Table,
  Validation,
} from "../../components/crudone"
import ErrorMessage from "../../components/ErrorMessage"
import { AdminService } from "../../services/AdminService"
import { LevelService } from "../../services/LevelService"

interface IState {
  admin: IAdmin[]
  level: ILevel[]
  loading: boolean
  error?: Error
}

export default class Admin extends Component<{}, IState> {
  public state: IState = {
    admin: [],
    level: [],
    loading: false,
  }

  public adminService = new AdminService()
  public levelService = new LevelService()

  public componentDidMount() {
    this.getLevel()
    this.getAdmin()
  }

  public getLevel = () => {
    this.levelService.get().then((level) => this.setState({ level }))
  }

  public getAdmin = () => {
    this.setState({ loading: true })
    this.adminService
      .get()
      .then((admin) => this.setState({ admin }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createAdmin = (input: IAdmin) => {
    this.setState({ loading: true })
    this.adminService
      .create(input)
      .then(this.getAdmin)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateAdmin = (input: IAdmin) => {
    this.setState({ loading: true })
    this.adminService
      .update(input, input._id)
      .then(this.getAdmin)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteAdmin = (input: IAdmin) => {
    this.setState({ loading: true })
    this.adminService
      .delete(input._id)
      .then(this.getAdmin)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      username: {
        label: "Username",
        validations: [Validation.required],
      },
      password: {
        label: "Password",
        type: "password",
        hideOnTable: true,
        validations: [Validation.required],
      },
      level: {
        label: "Level",
        type: "option",
        optionData: {
          data: this.state.level,
          textKey: "nama",
          valueKey: "_id",
        },
      },
    }

    return (
      <Fragment>
        <Grid style={styles.headerContainer}>
          <Grid.Column width="8">
            <Header content="Admin" subheader="Kumpulan data admin" />
          </Grid.Column>
          <Grid.Column width="8" textAlign="right">
            <Link to="/admin/level">
              <Button content="Level Admin" color="blue" />
            </Link>
          </Grid.Column>
        </Grid>

        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container data={this.state.admin} loading={this.state.loading}>
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Admin"
            updateTitle="Ubah Admin"
            onCreate={this.createAdmin}
            onUpdate={this.updateAdmin}
            onDelete={this.deleteAdmin}
          />
        </Container>
      </Fragment>
    )
  }
}

const styles = {
  headerContainer: {
    marginBottom: 5,
  },
}
