import React, { Component } from "react"
import { Button, Grid, Header, Modal } from "semantic-ui-react"
import FormInput from "./FormInput"
import FormInputError from "./FormInputError"
import FormValidator from "./FormValidator"

interface IProps {
  open: boolean
  fields: IField[]
  initialInput: any
  onCreate: (input: any) => void
  onUpdate?: (input: any) => void
  onDelete?: (input: any) => void
  onClose: () => void
  additionalAction?: (selectedData: any) => JSX.Element | null
}

interface IState {
  input: any
  inputErrors: any
}

export default class Form extends Component<IProps, IState> {
  public state: IState = {
    input: {},
    inputErrors: {},
  }

  public isUpdateMode() {
    return !(Object.keys(this.props.initialInput).length === 0)
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
      this.setState({ input: {}, inputErrors: {} })
    }
  }

  public addError = (name: string, message: string) => {
    const { inputErrors } = this.state
    inputErrors[name] = message
    this.setState({ inputErrors })
  }

  public removeError(name: string) {
    const { inputErrors } = this.state
    delete inputErrors[name]
    this.setState({ inputErrors })
  }

  public changeInput(name: string, value: any) {
    const { input } = this.state
    input[name] = value
    this.setState({ input })
    this.removeError(name)
  }

  public isInputValid() {
    return Object.keys(this.state.inputErrors).length === 0
  }

  public validateInputs() {
    this.props.fields.forEach((field) => {
      if (field.validations !== undefined)
        new FormValidator(field, this.state.input[field.name]).validate(
          this.addError,
        )
    })
  }

  public submit() {
    this.validateInputs()
    if (this.isInputValid()) {
      if (this.isUpdateMode()) this.props.onUpdate!(this.state.input)
      else this.props.onCreate(this.state.input)
      this.props.onClose()
    }
  }

  public renderAdditionalAction() {
    return this.props.additionalAction
      ? this.props.additionalAction(this.props.initialInput)
      : null
  }

  public renderDeleteButton() {
    return this.props.onDelete !== undefined && this.isUpdateMode() ? (
      <Button
        content="Hapus"
        color="red"
        onClick={() => {
          this.props.onDelete!(this.state.input)
          this.props.onClose()
        }}
      />
    ) : null
  }

  public renderSubmitButton() {
    return this.props.onUpdate !== undefined || !this.isUpdateMode() ? (
      <Button color="green" content="Simpan" onClick={() => this.submit()} />
    ) : null
  }

  public renderFormInputs() {
    return this.props.fields.map((field, index) => (
      <Grid.Column key={index}>
        <FormInput
          field={field}
          onChange={(value) => this.changeInput(field.name, value)}
          value={this.state.input[field.name]}
          readOnly={this.props.onUpdate === undefined && this.isUpdateMode()}
        />
        <FormInputError errorMessage={this.state.inputErrors[field.name]} />
      </Grid.Column>
    ))
  }

  public render() {
    return (
      <Modal
        open={this.props.open}
        size="large"
        onClose={() => this.props.onClose()}
      >
        <Header content={this.isUpdateMode() ? "Ubah Data" : "Tambah Data"} />
        <Modal.Content>
          <Grid columns="2">{this.renderFormInputs()}</Grid>
        </Modal.Content>
        <Modal.Actions>
          {this.renderAdditionalAction()}
          {this.renderDeleteButton()}
          {this.renderSubmitButton()}
        </Modal.Actions>
      </Modal>
    )
  }
}
