import React, { Component, Fragment } from "react"
import { Table } from "semantic-ui-react"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"
import TableLimiter from "./TableLimiter"
import TablePagination from "./TablePagination"

interface IProps {
  data: any[]
  fields: IField[]
}

interface IState {
  activePage: number
  itemPerPage: number
}

export default class DataTable extends Component<IProps, IState> {
  public state: IState = {
    activePage: 1,
    itemPerPage: 1,
  }

  public getOffset() {
    return (this.state.activePage - 1) * this.state.itemPerPage
  }

  public getPaginateData() {
    const offset = this.getOffset()
    const end = offset + this.state.itemPerPage
    return this.props.data.slice(offset, end)
  }

  public changePage(page: number) {
    this.setState({ activePage: page })
  }

  public changeLimit(limit: number) {
    this.setState({ itemPerPage: limit, activePage: 1 })
  }

  public render() {
    return (
      <Fragment>
        <TableLimiter onChange={(limit) => this.changeLimit(limit)} />
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
                itemPerPage={this.state.itemPerPage}
                activePage={this.state.activePage}
                onPageChange={(pageNumber) => this.changePage(pageNumber)}
              />
            </Table.Row>
          </Table.Footer>
        </Table>
      </Fragment>
    )
  }
}
