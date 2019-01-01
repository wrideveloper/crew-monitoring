import React, { Component } from "react"
import { Table } from "semantic-ui-react"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"
import TablePagination from "./TablePagination"

interface IProps {
  data: any[]
  itemPerPage: number
  fields: IField[]
}

interface IState {
  activePage: number
}

export default class DataTable extends Component<IProps, IState> {
  public state: IState = {
    activePage: 1,
  }

  public getOffset() {
    return (this.state.activePage - 1) * this.props.itemPerPage
  }

  public getPaginateData() {
    const offset = this.getOffset()
    const end = offset + this.props.itemPerPage
    return this.props.data.slice(this.getOffset(), end)
  }

  public changePage(page: number) {
    this.setState({ activePage: page })
  }

  public render() {
    return (
      <Table celled>
        <TableHeader fields={this.props.fields} />
        <TableBody
          fields={this.props.fields}
          data={this.getPaginateData()}
          startingNumber={this.getOffset() + 1}
        />
        <Table.Footer>
          <Table.Row>
            <TablePagination
              dataLength={this.props.data.length}
              itemPerPage={this.props.itemPerPage}
              onPageChange={(pageNumber) => this.changePage(pageNumber)}
            />
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}
