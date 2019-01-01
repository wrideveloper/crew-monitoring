import React, { Component } from "react"
import { Menu, Table } from "semantic-ui-react"
import PaginationItem from "./PaginationItem"

interface IProps {
  dataLength: number
  itemPerPage: number
  currentPage: number
  onPaginationItemClick: (pageNumber: number) => void
}

export default class Pagination extends Component<IProps> {
  public getTotalPage() {
    return Math.ceil(this.props.dataLength / this.props.itemPerPage)
  }

  public isActive(pageNumber: number) {
    return pageNumber === this.props.currentPage
  }

  public renderPaginationItems() {
    return [...Array(this.getTotalPage())].map((item, index) => {
      const pageNumber = index + 1
      return (
        <PaginationItem
          key={index}
          pageNumber={pageNumber}
          active={this.isActive(pageNumber)}
          onClick={() => this.props.onPaginationItemClick(pageNumber)}
        />
      )
    })
  }

  public render() {
    return (
      <Table.HeaderCell colSpan="3">
        <Menu floated="right" pagination>
          {this.renderPaginationItems()}
        </Menu>
      </Table.HeaderCell>
    )
  }
}
