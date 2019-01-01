import React, { Component } from "react"
import { Pagination, Table } from "semantic-ui-react"

interface IProps {
  dataLength: number
  itemPerPage: number
  onPageChange: (pageNumber: number) => void
}

export default class TablePagination extends Component<IProps> {
  public getTotalPages() {
    return Math.ceil(this.props.dataLength / this.props.itemPerPage)
  }

  public render() {
    return (
      <Table.HeaderCell colSpan="3" textAlign="right">
        <Pagination
          defaultActivePage={1}
          totalPages={this.getTotalPages()}
          onPageChange={(event, { activePage }) =>
            this.props.onPageChange(activePage as number)}
        />
      </Table.HeaderCell>
    )
  }
}
