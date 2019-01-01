import React, { Component } from "react"
import { Menu, Table } from "semantic-ui-react"
import PaginationItem from "./PaginationItem"

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

  public getTotalPage() {
    const pageNumber = Math.ceil(
      this.props.data.length / this.props.itemPerPage,
    )
    return pageNumber
  }

  public getItems() {
    const { currentPage } = this.state
    const { itemPerPage } = this.props
    const start = (currentPage - 1) * itemPerPage
    const end = currentPage * itemPerPage
    return this.props.data.slice(start, end)
  }

  public renderRow() {
    const { currentPage } = this.state
    const { itemPerPage } = this.props
    let rowNum = (currentPage - 1) * itemPerPage
    return this.getItems().map((item, index) => (
      <Table.Row key={index}>
        <Table.Cell>{++rowNum}</Table.Cell>
        <Table.Cell>{item.nama}</Table.Cell>
      </Table.Row>
    ))
  }

  public renderPagination() {
    return [...Array(this.getTotalPage())].map((item, index) => {
      const pageNumber = index + 1
      return (
        <PaginationItem
          key={index}
          pageNumber={pageNumber}
          active={pageNumber === this.state.currentPage}
          onClick={() => this.changePage(pageNumber)}
        />
      )
    })
  }

  public changePage(page: number) {
    this.setState({
      currentPage: page,
    })
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
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                {this.renderPagination()}
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}
