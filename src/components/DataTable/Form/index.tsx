import React, { Component } from "react"
import {
  Button,
  Dropdown,
  DropdownItemProps,
  Grid,
  Header,
  Input,
  Modal,
} from "semantic-ui-react"

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

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.isModalOpen(nextProps))
      // TODO: somehow this line make props initialInput changed when input state changed
      this.setState({ input: nextProps.initialInput })

    if (this.isModalClose(nextProps)) this.setState({ input: {} })
  }

  public isModalOpen(nextProps: IProps) {
    return (
      this.props.open === false &&
      nextProps.open === true &&
      this.isEmpty(this.state.input) &&
      !this.isEmpty(nextProps.initialInput)
    )
  }

  public isModalClose(nextProps: IProps) {
    return this.props.open === true && nextProps.open === false
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

  public isUpdateMode() {
    return !this.isEmpty(this.props.initialInput)
  }

  public isEmpty(object: any) {
    return Object.keys(object).length === 0
  }

  public getOptions(optionData: IOptionData): DropdownItemProps[] {
    return optionData.data.map((item) => ({
      text: item[optionData.labelKey],
      value: item[optionData.valueKey],
    }))
  }

  public getInputField(field: IField) {
    if (
      field.type === undefined ||
      field.type === "text" ||
      field.type === "number" ||
      field.type === "password"
    ) {
      return (
        <Input
          type={field.type}
          label={field.label}
          fluid
          onChange={(event) => this.changeInput(field.name, event.target.value)}
          value={this.state.input[field.name]}
        />
      )
    } else if (field.type === "option") {
      return (
        <Dropdown
          text={field.label}
          labeled
          button
          floating
          options={this.getOptions(field.optionData!)}
          value={this.state.input[field.name]}
          onChange={(event, { value }) => this.changeInput(field.name, value)}
        />
      )
    }
  }

  public renderInputFields() {
    return this.props.fields.map((field, index) => (
      <Grid.Column key={index}>{this.getInputField(field)}</Grid.Column>
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
          <Grid columns="2">{this.renderInputFields()}</Grid>
        </Modal.Content>
        <Modal.Actions>
          {this.isUpdateMode() ? (
            <Button
              content="Hapus"
              color="red"
              onClick={() => {
                this.props.onDelete(this.state.input)
                this.props.onClose()
              }}
            />
          ) : null}
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
