import React, { Component } from "react"
import { Table } from "semantic-ui-react"

interface IProps {
  fields: IField[]
  sortBy: string
  isDescending: boolean
  onChangeSort: (fieldName: string) => void
}

export default class TableHeader extends Component<IProps> {
  public isSorted(fieldName: string) {
    const { sortBy, isDescending } = this.props
    const direction = isDescending ? "descending" : "ascending"
    return fieldName === sortBy ? direction : undefined
  }

  public renderHeaderCells() {
    return this.props.fields.map((field, index) => (
      <Table.HeaderCell
        key={index}
        sorted={this.isSorted(field.name)}
        onClick={() => this.props.onChangeSort(field.name)}
      >
        {field.label}
      </Table.HeaderCell>
    ))
  }

  public render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No</Table.HeaderCell>
          {this.renderHeaderCells()}
        </Table.Row>
      </Table.Header>
    )
  }
}
