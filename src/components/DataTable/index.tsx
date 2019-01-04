import React, { Component, Fragment } from "react"
import { Button } from "semantic-ui-react"
import Form from "./Form"
import Table from "./Table"

interface IProps {
  data: any[]
  fields: IField[]
  onCreate: (input: any) => void
  onUpdate: (input: any) => void
  onDelete: (input: any) => void
}

interface IState {
  open: boolean
  selectedData: object
}

export default class DataTable extends Component<IProps, IState> {
  public state: IState = {
    open: false,
    selectedData: {},
  }

  public openForm(selectedData: any) {
    this.setState({ open: true, selectedData })
  }

  public closeForm() {
    this.setState({ open: false })
  }

  public render() {
    return (
      <Fragment>
        <Button
          content="Tambah"
          color="green"
          onClick={() => this.openForm({})}
        />
        <Form
          open={this.state.open}
          fields={this.props.fields}
          initialInput={this.state.selectedData}
          onCreate={(input) => this.props.onCreate(input)}
          onUpdate={(input) => this.props.onUpdate(input)}
          onDelete={(input) => this.props.onDelete(input)}
          onClose={() => this.closeForm()}
        />
        <Table
          data={this.props.data}
          fields={this.props.fields}
          onRowClick={(rowData: any) => this.openForm(rowData)}
        />
      </Fragment>
    )
  }
}
