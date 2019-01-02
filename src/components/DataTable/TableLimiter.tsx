import React, { Component } from "react"
import { Dropdown, DropdownItemProps } from "semantic-ui-react"

interface IProps {
  onChange: (limit: number) => void
}

const options: DropdownItemProps[] = [
  {
    text: "1",
    value: 1,
  },
  {
    text: "2",
    value: 2,
  },
]

export default class TableLimiter extends Component<IProps> {
  public render() {
    return (
      <div>
        <Dropdown
          text="Item Perhalaman"
          button
          options={options}
          defaultValue={options[0].value}
          onChange={(event, { value }) => this.props.onChange(value as number)}
        />
      </div>
    )
  }
}
