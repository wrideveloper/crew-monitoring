import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { AdminService } from "../../services/AdminService"

interface IState {
  admin: IAdmin[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "username",
    label: "Username",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
]

export default class Admin extends Component<{}, IState> {
  public state: IState = {
    admin: [],
    loading: false,
  }

  public adminService = new AdminService()

  public componentDidMount() {
    this.getAdmin()
  }

  public getAdmin() {
    this.setState({ loading: true })
    this.adminService
      .get()
      .then((admin) => this.setState({ admin }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createAdmin(input: IAdmin) {
    this.setState({ loading: true })
    this.adminService
      .create(input)
      .then(() => this.getAdmin())
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public updateAdmin(input: IAdmin, id: string) {
    this.setState({ loading: true })
    this.adminService
      .update(input, id)
      .then(() => this.getAdmin())
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public async deleteAdmin(id: string) {
    this.setState({ loading: true })
    this.adminService
      .delete(id)
      .then(() => this.getAdmin())
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Admin" subheader="Kumpulan data admin" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IAdmin>
          data={this.state.admin}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createAdmin(input)}
          onUpdate={(input) => this.updateAdmin(input, input._id)}
          onDelete={(input) => this.deleteAdmin(input._id)}
        />
      </Fragment>
    )
  }
}
