import React, { Component, Fragment } from "react"

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
  selectedData: any
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
  selectedData: {},
})

class DataTable<T> extends Component<IProps<T>, IState> {
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
      isUpdateMode: this.state.isUpdateMode,
      openForm: this.openForm,
      closeForm: this.closeForm,
      selectedData: this.state.selectedData,
    }
    return (
      <DataTableContext.Provider value={providerValue}>
        {this.props.children}
      </DataTableContext.Provider>
    )
  }
}

export default DataTable
