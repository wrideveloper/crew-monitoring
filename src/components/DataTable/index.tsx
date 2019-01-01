import React, { Component } from "react"
import { Table } from "semantic-ui-react"
import Pagination from "./Pagination"

interface IProps {
  data: any[]
  itemPerPage: number
}

interface IState {
  currentPage: number
}

export default class DataTable extends Component<IProps, IState> {
  public state: IState = {
    currentPage: 1,
  }

  public getOffset() {
    return (this.state.currentPage - 1) * this.props.itemPerPage
  }

  public getItems() {
    const offset = this.getOffset()
    const end = offset + this.props.itemPerPage
    return this.props.data.slice(this.getOffset(), end)
  }

  public renderRow() {
    let offset = this.getOffset()
    return this.getItems().map((item, index) => (
      <Table.Row key={index}>
        <Table.Cell>{++offset}</Table.Cell>
        <Table.Cell>{item.nama}</Table.Cell>
      </Table.Row>
    ))
  }

  public changePage(page: number) {
    this.setState({ currentPage: page })
  }

  public render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Nama Divisi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderRow()}</Table.Body>
        <Table.Footer>
          <Table.Row>
            <Pagination
              dataLength={this.props.data.length}
              itemPerPage={this.props.itemPerPage}
              currentPage={this.state.currentPage}
              onPaginationItemClick={(pageNumber) => this.changePage(pageNumber)}
            />
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}
