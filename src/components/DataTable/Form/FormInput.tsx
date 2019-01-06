import React, { Component } from "react"
import { Input } from "semantic-ui-react"
import InputDropdown from "./InputDropdown"
import InputImage from "./InputImage"

interface IProps {
  field: IField
  onChange: (value: any) => void
  value: any
}

export default class FormInput extends Component<IProps> {
  public renderInput() {
    const { field, value } = this.props
    if (field.type === "option") {
      return (
        <InputDropdown
          field={field}
          onChange={(value) => this.props.onChange(value)}
          value={value}
        />
      )
    } else if (field.type === "image") {
      return (
        <InputImage
          field={field}
          onChange={(value) => this.props.onChange(value)}
          value={value}
        />
      )
    } else {
      return (
        <Input
          type={field.type}
          label={field.label}
          fluid
          onChange={(event) => this.props.onChange(event.target.value)}
          value={value}
        />
      )
    }
  }

  public render() {
    return this.renderInput()
  }
}
