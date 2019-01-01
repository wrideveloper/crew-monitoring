import React, { Component } from "react"
import { Table } from "semantic-ui-react"

interface IProps {
  headerTitles: string[]
}

export default class TableHeader extends Component<IProps> {
  public renderHeaderCells() {
    return this.props.headerTitles.map((title) => (
      <Table.HeaderCell>{title}</Table.HeaderCell>
    ))
  }

  public render() {
    return (
      <Table.Header>
        <Table.Row>{this.renderHeaderCells()}</Table.Row>
      </Table.Header>
    )
  }
}
