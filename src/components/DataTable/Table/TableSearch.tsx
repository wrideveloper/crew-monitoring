import React, { Component } from "react"
import { Dropdown, DropdownItemProps, Input } from "semantic-ui-react"

interface IProps {
  shownFields: IField[]
  searchValue: string
  searchKey: string
  onChangeSearchValue: (value: string) => void
  onChangeSearchKey: (value: string) => void
}

export default class TableSearch extends Component<IProps> {
  public getOptions(): DropdownItemProps[] {
    return this.props.shownFields.map((field) => ({
      text: field.label,
      value: field.name,
    }))
  }

  public render() {
    return (
      <Input
        action={
          <Dropdown
            button
            floating
            options={this.getOptions()}
            value={this.props.searchKey}
            onChange={(event, { value }) => this.props.onChangeSearchKey(value as string)}
          />
        }
        icon="search"
        iconPosition="left"
        placeholder="Cari dalam tabel"
        value={this.props.searchValue}
        onChange={(event) => this.props.onChangeSearchValue(event.target.value)}
      />
    )
  }
}
