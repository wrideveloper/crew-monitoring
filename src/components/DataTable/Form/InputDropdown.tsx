import React, { Component, Fragment } from "react"
import { Dropdown, DropdownItemProps, Label } from "semantic-ui-react"

interface IProps {
  field: IField
  onChange: (value: any) => void
  value: any
}

export default class InputDropdown extends Component<IProps> {
  public getValue() {
    const { value, field } = this.props
    return value ? value[field.optionData!.valueKey] : undefined
  }

  public getOptions(): DropdownItemProps[] {
    const { optionData } = this.props.field
    return optionData!.data.map((item) => ({
      text: item[optionData!.labelKey],
      value: item[optionData!.valueKey],
    }))
  }

  public render() {
    return (
      <Fragment>
        <Label size="large" content={this.props.field.label} />
        <Dropdown
          placeholder={"Pilih " + this.props.field.label}
          inline
          basic
          button
          floating
          options={this.getOptions()}
          value={this.getValue()}
          onChange={(event, { value }) => this.props.onChange(value)}
        />
      </Fragment>
    )
  }
}
