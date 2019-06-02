import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Grid, Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { AdminService } from "../../services/AdminService"

interface IState {
  admin: IAdmin[]
  loading: boolean
  error?: Error
}

export default class Admin extends Component<{}, IState> {
  public state: IState = {
    admin: [],
    loading: false,
  }

  public adminService = new AdminService()

  public componentDidMount() {
    this.getAdmin()
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

  public deleteAdmin = (input: IAdmin) => {
    this.setState({ loading: true })
    this.adminService
      .delete(input._id)
      .then(this.getAdmin)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
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
        <DataTable<IAdmin>
          data={this.state.admin}
          loading={this.state.loading}
          onCreate={this.createAdmin}
          onDelete={this.deleteAdmin}
          fields={[
            {
              name: "username",
              label: "Username",
              validations: ["required"],
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              hideOnTable: true,
              validations: ["required"],
            },
          ]}
        />
      </Fragment>
    )
  }
}

const styles = {
  headerContainer: {
    marginBottom: 5,
  },
}
