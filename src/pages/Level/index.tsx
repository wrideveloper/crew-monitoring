import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { LevelService } from "../../services/LevelService"

interface IState {
  level: ILevel[]
  loading: boolean
  error?: Error
}

export default class Level extends Component<{}, IState> {
  public state: IState = {
    level: [],
    loading: false,
  }

  public levelService = new LevelService()

  public componentDidMount() {
    this.getLevel()
  }

  public getLevel = () => {
    this.setState({ loading: true })
    this.levelService
      .get()
      .then((level) => this.setState({ level }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createLevel = (input: ILevel) => {
    this.setState({ loading: true })
    this.levelService
      .create(input)
      .then(this.getLevel)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateLevel = (input: ILevel) => {
    this.setState({ loading: true })
    this.levelService
      .update(input, input._id)
      .then(this.getLevel)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteLevel = (input: ILevel) => {
    this.setState({ loading: true })
    this.levelService
      .delete(input._id)
      .then(this.getLevel)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Level Admin" subheader="Kumpulan data level admin" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<ILevel>
          data={this.state.level}
          loading={this.state.loading}
          onCreate={this.createLevel}
          onUpdate={this.updateLevel}
          onDelete={this.deleteLevel}
          fields={[
            {
              name: "nama",
              label: "Nama Level",
              validations: ["required"],
            },
          ]}
        />
      </Fragment>
    )
  }
}
