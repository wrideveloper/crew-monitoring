import React, { Component } from "react"
import { Table } from "semantic-ui-react"

interface IProps {
  fields: IField[]
}

export default class TableHeader extends Component<IProps> {
  public renderHeaderCells() {
    return this.props.fields.map((field) => (
      <Table.HeaderCell>{field.label}</Table.HeaderCell>
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
