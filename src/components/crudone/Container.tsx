import React, { Component } from "react"
import { IContainerContext, ISchema } from "./types"

interface IProps {
  schema: ISchema
}

interface IState {
  open: boolean
  selectedData: any
  isUpdateMode: boolean
}

export const ContainerContext = React.createContext<IContainerContext>({
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

  public getConvertedSchema = (): IField[] => {
    return Object.keys(this.props.schema).map((key) => ({
      name: key,
      ...this.props.schema[key],
    }))
  }

  public getTableFields = () => {
    return this.getConvertedSchema().filter((field) => !field.hideOnTable)
  }

  public getFormFields = () => {
    return this.getConvertedSchema().filter((field) => !field.hideOnForm)
  }

  public render() {
    const providerValue: IContainerContext = {
      getTableFields: this.getTableFields,
      getFormFields: this.getFormFields,
      open: this.state.open,
      isUpdateMode: this.state.isUpdateMode,
      openForm: this.openForm,
      closeForm: this.closeForm,
      selectedData: this.state.selectedData,
    }
    return (
      <ContainerContext.Provider value={providerValue}>
        {this.props.children}
      </ContainerContext.Provider>
    )
  }
}

export default DataTable
