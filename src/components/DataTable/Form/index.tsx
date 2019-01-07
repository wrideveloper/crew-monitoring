import React, { Component } from "react"
import { Button, Grid, Header, Modal } from "semantic-ui-react"
import FormInput from "./FormInput"

interface IProps {
  open: boolean
  fields: IField[]
  initialInput: any
  onCreate: (input: any) => void
  onUpdate: (input: any) => void
  onDelete: (input: any) => void
  onClose: () => void
}

interface IState {
  input: any
}

export default class Form extends Component<IProps, IState> {
  public state: IState = {
    input: {},
  }

  public isObjectEmpty(object: any) {
    return Object.keys(object).length === 0
  }

  public isUpdateMode() {
    return !this.isObjectEmpty(this.props.initialInput)
  }

  public isModalOpen(nextProps: IProps) {
    return this.props.open === false && nextProps.open === true
  }

  public isModalClose(nextProps: IProps) {
    return this.props.open === true && nextProps.open === false
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.isModalOpen(nextProps)) {
      const initialInput = JSON.parse(JSON.stringify(nextProps.initialInput))
      this.setState({ input: initialInput })
    }

    if (this.isModalClose(nextProps)) {
      this.setState({ input: {} })
    }
  }

  public changeInput(name: string, value: any) {
    const { input } = this.state
    input[name] = value
    this.setState({ input })
  }

  public submit() {
    if (this.isUpdateMode()) this.props.onUpdate(this.state.input)
    else this.props.onCreate(this.state.input)
    this.props.onClose()
  }

  public renderDeleteButton() {
    return this.isUpdateMode() ? (
      <Button
        content="Hapus"
        color="red"
        onClick={() => {
          this.props.onDelete(this.state.input)
          this.props.onClose()
        }}
      />
    ) : null
  }

  public renderFormInputs() {
    return this.props.fields.map((field, index) => (
      <Grid.Column key={index}>
        <FormInput
          field={field}
          onChange={(value) => this.changeInput(field.name, value)}
          value={this.state.input[field.name]}
        />
      </Grid.Column>
    ))
  }

  public render() {
    return (
      <Modal
        open={this.props.open}
        size="small"
        onClose={() => this.props.onClose()}
      >
        <Header content={this.isUpdateMode() ? "Ubah Data" : "Tambah Data"} />
        <Modal.Content>
          <Grid columns="2">{this.renderFormInputs()}</Grid>
        </Modal.Content>
        <Modal.Actions>
          {this.renderDeleteButton()}
          <Button
            color="green"
            content="Simpan"
            onClick={() => this.submit()}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
