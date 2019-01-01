import React, { Component } from "react"
import { Table } from "semantic-ui-react"
import Pagination from "./Pagination"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

interface IProps {
  data: any[]
  itemPerPage: number
  headerTitles: string[]
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

  public getPaginateData() {
    const offset = this.getOffset()
    const end = offset + this.props.itemPerPage
    return this.props.data.slice(this.getOffset(), end)
  }

  public changePage(page: number) {
    this.setState({ currentPage: page })
  }

  public render() {
    return (
      <Table celled>
        <TableHeader headerTitles={this.props.headerTitles} />
        <TableBody data={this.getPaginateData()} offset={this.getOffset()} />
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
