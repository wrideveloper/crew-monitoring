import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { DivisiService } from "../../services/DivisiService"
import { MiniclassService } from "../../services/MiniclassService"

interface IState {
  miniclass: IMiniclass[]
  divisi: IDivisi[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "nama",
    label: "Nama Miniclass",
    validations: ["required"],
  },
  {
    name: "divisi",
    label: "Divisi",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "nama",
      valueKey: "_id",
    },
  },
]

export default class Miniclass extends Component<{}, IState> {
  public state: IState = {
    miniclass: [],
    divisi: [],
    loading: false,
  }

  public miniclassService = new MiniclassService()
  public divisiService = new DivisiService()

  public componentDidMount() {
    this.getMiniclass()
    this.getDivisi()
  }

  public getDivisi() {
    this.divisiService.get().then((divisi) => this.setState({ divisi }))
  }

  public getMiniclass = () => {
    this.setState({ loading: true })
    this.miniclassService
      .get()
      .then((miniclass) => this.setState({ miniclass }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createAnggota = (input: IMiniclass) => {
    this.setState({ loading: true })
    this.miniclassService
      .create(input)
      .then(this.getMiniclass)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateAnggota = (input: IMiniclass) => {
    this.setState({ loading: true })
    this.miniclassService
      .update(input, input._id)
      .then(this.getMiniclass)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteAnggota = (input: IMiniclass) => {
    this.setState({ loading: true })
    this.miniclassService
      .delete(input._id)
      .then(this.getMiniclass)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public setOptionsData() {
    fields[1].optionData!.data = this.state.divisi
  }

  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header content="Miniclass" subheader="Kumpulan data miniclass" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IMiniclass>
          data={this.state.miniclass}
          loading={this.state.loading}
          fields={fields}
          onCreate={this.createAnggota}
          onUpdate={this.updateAnggota}
          onDelete={this.deleteAnggota}
        />
      </Fragment>
    )
  }
}
