import React, { Component } from "react"
import { Table } from "semantic-ui-react"

interface IProps {
  fields: IField[]
  data: any[]
  startingNumber: number
}

export default class TableBody extends Component<IProps> {
  public renderRow() {
    let startingNumber = this.props.startingNumber
    return this.props.data.map((row, index) => (
      <Table.Row key={index}>
        <Table.Cell>{startingNumber++}</Table.Cell>
        {this.renderCell(row)}
      </Table.Row>
    ))
  }

  public renderCell(row: any) {
    return this.props.fields.map((field, index) => (
      <Table.Cell key={index}>{row[field.name]}</Table.Cell>
    ))
  }

  public render() {
    return <Table.Body>{this.renderRow()}</Table.Body>
  }
}
