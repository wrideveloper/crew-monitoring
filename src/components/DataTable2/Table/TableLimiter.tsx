import React, { Component } from "react"
import { Dropdown, DropdownItemProps } from "semantic-ui-react"

interface IProps {
  onChange: (limit: number) => void
}

const options: DropdownItemProps[] = [
  {
    text: "10",
    value: 10,
  },
  {
    text: "25",
    value: 25,
  },
  {
    text: "50",
    value: 50,
  },
]

export default class TableLimiter extends Component<IProps> {
  public render() {
    return (
      <Dropdown
        floating
        text="Item Perhalaman"
        button
        options={options}
        defaultValue={options[0].value}
        onChange={(event, { value }) => this.props.onChange(value as number)}
      />
    )
  }
}
