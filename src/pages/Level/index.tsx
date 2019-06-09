import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import {
  Container,
  CreateButton,
  Form,
  ISchema,
  Table,
} from "../../components/crudone"
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

  public renderAdditionalAction(level: ILevel, isUpdateMode: boolean) {
    return isUpdateMode ? (
      <Link to={`/admin/level/hakAkses`}>
        <Button
          content="Hak Akses"
          color="orange"
          onClick={() => localStorage.setItem("level", JSON.stringify(level))}
        />
      </Link>
    ) : null
  }

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama Level",
        validations: ["required"],
      },
    }

    return (
      <Fragment>
        <Header content="Level Admin" subheader="Kumpulan data level admin" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container data={this.state.level} loading={this.state.loading}>
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Level"
            updateTitle="Ubah Level"
            onCreate={this.createLevel}
            onUpdate={this.updateLevel}
            onDelete={this.deleteLevel}
            additionalAction={this.renderAdditionalAction}
          />
        </Container>
      </Fragment>
    )
  }
}
