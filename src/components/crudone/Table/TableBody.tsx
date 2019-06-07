import React, { Component } from "react"
import { Table } from "semantic-ui-react"
import { IField } from "../types"

interface IProps {
  fields: IField[]
  paginatedData: any[]
  startingNumber: number
  onRowClick: (rowData: any) => void
}

export default class TableBody extends Component<IProps> {
  public getCellText(rowData: any, field: IField) {
    const cellData = rowData[field.name]
    if (field.type === "option") {
      return cellData[field.optionData!.textKey]
    } else if (field.type === "date") {
      return new Date(cellData).toLocaleDateString("id")
    } else {
      return cellData
    }
  }

  public renderCell(row: any) {
    return this.props.fields.map((field) => (
      <Table.Cell key={field.name}>{this.getCellText(row, field)}</Table.Cell>
    ))
  }

  public renderRow() {
    let { startingNumber } = this.props
    return this.props.paginatedData.map((rowData, index) => (
      <Table.Row
        key={index}
        onClick={() => this.props.onRowClick(rowData)}
        style={styles.tableRow}
      >
        <Table.Cell>{startingNumber++}</Table.Cell>
        {this.renderCell(rowData)}
      </Table.Row>
    ))
  }

  public render() {
    return <Table.Body>{this.renderRow()}</Table.Body>
  }
}

const styles = {
  tableRow: {
    cursor: "pointer",
  },
}
