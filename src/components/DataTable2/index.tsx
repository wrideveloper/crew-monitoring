import React, { Component, Fragment } from "react"
import { Button } from "semantic-ui-react"
import Form from "./Form"

interface IProps<T> {
  data: T[]
  fields: IField[]
  loading: boolean
  onCreate?: (input: T) => void
  onUpdate?: (input: T) => void
  onDelete?: (input: T) => void
  additionalAction?: (
    formValues: T,
    isUpdateMode: boolean,
  ) => JSX.Element | null
}

interface IState {
  open: boolean
  formValues: any
  isUpdateMode: boolean
}

export const DataTableContext = React.createContext<IDataTableContext>({
  data: [],
  loading: false,
  getTableFields: () => [],
  getFormFields: () => [],
  onCreate: () => undefined,
  onUpdate: () => undefined,
  onDelete: () => undefined,
  open: false,
  isUpdateMode: false,
  openForm: () => undefined,
  closeForm: () => undefined,
  formValues: {},
  changeFormValue: () => undefined,
})

class DataTable<T> extends Component<IProps<T>, IState> {
  public state: IState = {
    open: false,
    formValues: {},
    isUpdateMode: false,
  }

  public changeFormValue = (name: string, value: any) => {
    const { formValues } = this.state
    formValues[name] = value
    this.setState({ formValues })
  }

  public openForm = (formValues: any, isUpdateMode: boolean) => {
    this.setState({ open: true, formValues, isUpdateMode })
  }

  public closeForm = () => {
    this.setState({ open: false })
  }

  public getTableFields = () => {
    return this.props.fields.filter((field) => !field.hideOnTable)
  }

  public getFormFields = () => {
    return this.props.fields.filter((field) => !field.hideOnForm)
  }

  public render() {
    const providerValue: IDataTableContext = {
      data: this.props.data,
      loading: this.props.loading,
      getTableFields: this.getTableFields,
      getFormFields: this.getFormFields,
      onCreate: this.props.onCreate,
      onUpdate: this.props.onUpdate,
      onDelete: this.props.onDelete,
      open: this.state.open,
      isUpdateMode: false,
      openForm: this.openForm,
      closeForm: this.closeForm,
      formValues: this.state.formValues,
      changeFormValue: this.changeFormValue,
    }
    return (
      <DataTableContext.Provider value={providerValue}>
        <Form
          open={this.state.open}
          fields={this.getFormFields()}
          initialInput={this.state.formValues}
          isUpdateMode={this.state.isUpdateMode}
          onCreate={this.props.onCreate}
          onUpdate={this.props.onUpdate}
          onDelete={this.props.onDelete}
          onClose={this.closeForm}
          additionalAction={this.props.additionalAction}
        />
        {this.props.children}
      </DataTableContext.Provider>
    )
  }
}

export default DataTable
