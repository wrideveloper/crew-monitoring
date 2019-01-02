import _ from "lodash"
import React, { Component, Fragment } from "react"
import { Grid, Table } from "semantic-ui-react"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"
import TableLimiter from "./TableLimiter"
import TablePagination from "./TablePagination"
import TableSearch from "./TableSearch"

interface IProps {
  data: any[]
  fields: IField[]
}

interface IState {
  activePage: number
  itemPerPage: number
  searchValue: string
  searchKey: string
}

export default class DataTable extends Component<IProps, IState> {
  public state: IState = {
    activePage: 1,
    itemPerPage: 1,
    searchValue: "",
    searchKey: this.props.fields[0].name,
  }

  public changePage(page: number) {
    this.setState({ activePage: page })
  }

  public changeLimit(limit: number) {
    this.setState({ itemPerPage: limit, activePage: 1 })
  }

  public changeSearchValue(value: string) {
    this.setState({ searchValue: value, activePage: 1 })
  }

  public changeSearchKey(key: string) {
    this.setState({ searchKey: key, activePage: 1 })
  }

  public getOffset() {
    return (this.state.activePage - 1) * this.state.itemPerPage
  }

  public getFilteredData() {
    return this.props.data.filter((item) => {
      const currentItem = item[this.state.searchKey] as string
      return currentItem.search(this.state.searchValue) > -1
    })
  }

  public getPaginatedData() {
    const offset = this.getOffset()
    const end = offset + this.state.itemPerPage
    return this.getFilteredData().slice(offset, end)
  }

  public render() {
    return (
      <Fragment>
        <Grid columns="2">
          <Grid.Column>
            <TableSearch
              searchValue={this.state.searchValue}
              searchKey={this.state.searchKey}
              fields={this.props.fields}
              onChangeSearchValue={(value) => this.changeSearchValue(value)}
              onChangeSearchKey={(key) => this.changeSearchKey(key)}
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <TableLimiter onChange={(limit) => this.changeLimit(limit)} />
          </Grid.Column>
        </Grid>

        <Table celled>
          <TableHeader fields={this.props.fields} />
          <TableBody
            fields={this.props.fields}
            data={this.getPaginatedData()}
            startingNumber={this.getOffset() + 1}
          />
          <Table.Footer>
            <Table.Row>
              <TablePagination
                dataLength={this.getFilteredData().length}
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
