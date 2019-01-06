import React, { Component } from "react"
import { Pagination, Table } from "semantic-ui-react"

interface IProps {
  activePage: number
  dataLength: number
  itemPerPage: number
  onPageChange: (pageNumber: number) => void
}

export default class TablePagination extends Component<IProps> {
  public getTotalPages() {
    return Math.ceil(this.props.dataLength / this.props.itemPerPage)
  }

  public renderPagination() {
    return this.getTotalPages() > 1 ? (
      <Pagination
        activePage={this.props.activePage}
        totalPages={this.getTotalPages()}
        onPageChange={(event, { activePage }) =>
          this.props.onPageChange(activePage as number)}
      />
    ) : null
  }

  public render() {
    return (
      <Table.HeaderCell colSpan="100" textAlign="right">
        {this.renderPagination()}
      </Table.HeaderCell>
    )
  }
}
