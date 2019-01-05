import React, { Component } from "react"
import { Table } from "semantic-ui-react"

interface IProps {
  fields: IField[]
  data: any[]
  startingNumber: number
  onRowClick: (rowData: any) => void
}

export default class TableBody extends Component<IProps> {
  // check if data is an object from populated data
  public getCellData(rowData: any, field: IField) {
    const cellData = rowData[field.name]
    if (cellData === Object(cellData)) {
      return cellData[field.optionData!.labelKey]
    } else {
      return cellData
    }
  }

  public renderCell(row: any) {
    return this.props.fields.map((field, index) => (
      <Table.Cell key={index}>{this.getCellData(row, field)}</Table.Cell>
    ))
  }

  public renderRow() {
    let startingNumber = this.props.startingNumber
    return this.props.data.map((row, index) => (
      <Table.Row key={index} onClick={() => this.props.onRowClick(row)}>
        <Table.Cell>{startingNumber++}</Table.Cell>
        {this.renderCell(row)}
      </Table.Row>
    ))
  }

  public render() {
    return <Table.Body>{this.renderRow()}</Table.Body>
  }
}
