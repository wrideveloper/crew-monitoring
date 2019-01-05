import React, { Component, Fragment } from "react"
import { Dropdown, DropdownItemProps, Input, Label } from "semantic-ui-react"

interface IProps {
  field: IField
  onChange: (value: any) => void
  value: any
}

export default class FormInput extends Component<IProps> {
  public getOptions(optionData: IOptionData): DropdownItemProps[] {
    return optionData.data.map((item) => ({
      text: item[optionData.labelKey],
      value: item[optionData.valueKey],
    }))
  }

  public getInput(field: IField) {
    if (field.type === "option") {
      return (
        <Fragment>
          <Label size="large" content={field.label} />
          <Dropdown
            placeholder={"Pilih " + field.label}
            inline
            basic
            button
            floating
            options={this.getOptions(field.optionData!)}
            value={this.props.value}
            onChange={(event, { value }) => this.props.onChange(value)}
          />
        </Fragment>
      )
    } else {
      return (
        <Input
          type={field.type}
          label={field.label}
          fluid
          onChange={(event) => this.props.onChange(event.target.value)}
          value={this.props.value}
        />
      )
    }
  }

  public render() {
    return this.getInput(this.props.field)
  }
}
