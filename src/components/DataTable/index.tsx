import React, { Component, Fragment } from "react"
import { Button } from "semantic-ui-react"
import Form from "./Form"
import Table from "./Table"

interface IProps<T> {
  data: T[]
  fields: IField[]
  loading: boolean
  onCreate?: (input: T) => void
  onUpdate?: (input: T) => void
  onDelete?: (input: T) => void
  additionalAction?: (
    selectedData: T,
    isUpdateMode: boolean,
  ) => JSX.Element | null
}

interface IState {
  open: boolean
  selectedData: any
  isUpdateMode: boolean
}

export default class DataTable<T> extends Component<IProps<T>, IState> {
  public state: IState = {
    open: false,
    selectedData: {},
    isUpdateMode: false,
  }

  public openForm = (selectedData: any, isUpdateMode: boolean) => {
    this.setState({ open: true, selectedData, isUpdateMode })
  }

  public closeForm = () => {
    this.setState({ open: false })
  }

  public getTableFields() {
    return this.props.fields.filter((field) => !field.hideOnTable)
  }

  public getFormFields() {
    return this.props.fields.filter((field) => !field.hideOnForm)
  }

  public renderCreateButton() {
    return (
      this.props.onCreate && (
        <Button
          content="Tambah"
          color="green"
          onClick={() => this.openForm({}, false)}
        />
      )
    )
  }

  public render() {
    return (
      <Fragment>
        {this.renderCreateButton()}
        <Form
          open={this.state.open}
          fields={this.getFormFields()}
          initialInput={this.state.selectedData}
          isUpdateMode={this.state.isUpdateMode}
          onCreate={this.props.onCreate}
          onUpdate={this.props.onUpdate}
          onDelete={this.props.onDelete}
          onClose={this.closeForm}
          additionalAction={this.props.additionalAction}
        />
        <Table
          data={this.props.data}
          loading={this.props.loading}
          fields={this.getTableFields()}
          onRowClick={(rowData) => this.openForm(rowData, true)}
        />
      </Fragment>
    )
  }
}
