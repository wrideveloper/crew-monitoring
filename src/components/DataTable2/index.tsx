import React, { Component, Fragment } from "react"

interface IProps {
  fields: IField[]
}

interface IState {
  open: boolean
  selectedData: any
  isUpdateMode: boolean
}

export const DataTableContext = React.createContext<IDataTableContext>({
  getTableFields: () => [],
  getFormFields: () => [],
  open: false,
  isUpdateMode: false,
  openForm: () => undefined,
  closeForm: () => undefined,
  selectedData: {},
})

class DataTable extends Component<IProps, IState> {
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
      getTableFields: this.getTableFields,
      getFormFields: this.getFormFields,
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
