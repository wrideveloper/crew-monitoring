import React, { Component, Fragment } from "react"
import { Button, Dropdown, DropdownItemProps, Label } from "semantic-ui-react"

interface IProps {
  field: IField
  onChange: (value: any) => void
  value: any
  readOnly: boolean
}

export default class InputDropdown extends Component<IProps> {
  public getValue() {
    const { value, field } = this.props
    return value ? value[field.optionData!.valueKey] : undefined
  }

  public getOptions(): DropdownItemProps[] {
    const { optionData } = this.props.field
    return optionData!.data.map((item) => ({
      text: item[optionData!.textKey],
      value: item[optionData!.valueKey],
    }))
  }

  public render() {
    return (
      <Fragment>
        <Button.Group fluid>
          <Label
            size="large"
            content={this.props.field.label}
            style={styles.label}
          />
          <Dropdown
            placeholder={"Pilih " + this.props.field.label}
            basic
            selection
            button
            floating
            options={this.getOptions()}
            value={this.getValue()}
            onChange={(event, { value }) => this.props.onChange(value)}
            disabled={this.props.readOnly}
            style={styles.dropdown}
          />
        </Button.Group>
      </Fragment>
    )
  }
}

const styles = {
  label: {
    marginRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    display: "flex",
    alignItems: "center",
  },
  dropdown: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}
