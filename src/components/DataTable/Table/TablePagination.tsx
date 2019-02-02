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

  public render() {
    return this.getTotalPages() > 1 ? (
      <Pagination
        activePage={this.props.activePage}
        totalPages={this.getTotalPages()}
        onPageChange={(event, { activePage }) => this.props.onPageChange(activePage as number)}
        style={styles.pagination}
      />
    ) : null
  }
}

const styles = {
  pagination: {
    float: "right",
  },
}
