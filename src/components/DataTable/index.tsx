import React, { Component, Fragment } from "react"
import { Button } from "semantic-ui-react"
import Form from "./Form"
import Table from "./Table"

interface IProps<TDATA, TINPUT> {
  data: TDATA[]
  fields: IField[]
  onCreate: (input: TINPUT) => void
  onUpdate: (input: TINPUT) => void
  onDelete: (input: TINPUT) => void
  additionalAction?: (selectedData: TDATA) => JSX.Element | null
}

interface IState {
  open: boolean
  selectedData: any
}

export default class DataTable<TDATA, TINPUT> extends Component<
  IProps<TDATA, TINPUT>,
  IState
> {
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

  public getShownFields() {
    return this.props.fields.filter((field) => !field.hide)
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
          additionalAction={this.props.additionalAction}
        />
        <Table
          data={this.props.data}
          shownFields={this.getShownFields()}
          onRowClick={(rowData: any) => this.openForm(rowData)}
        />
      </Fragment>
    )
  }
}
