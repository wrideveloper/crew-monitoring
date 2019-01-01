import React, { Component } from "react"
import { Table } from "semantic-ui-react"

interface IProps {
  data: any[]
  offset: number
}

export default class TableBody extends Component<IProps> {
  public renderRow() {
    let offset = this.props.offset
    return this.props.data.map((item, index) => (
      <Table.Row key={index}>
        <Table.Cell>{++offset}</Table.Cell>
        <Table.Cell>{item.nama}</Table.Cell>
      </Table.Row>
    ))
  }

  public render() {
    return <Table.Body>{this.renderRow()}</Table.Body>
  }
}
