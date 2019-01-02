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
  sortBy: string
  isDescending: boolean
}

export default class DataTable extends Component<IProps, IState> {
  public state: IState = {
    activePage: 1,
    itemPerPage: 1,
    searchValue: "",
    searchKey: this.props.fields[0].name,
    sortBy: this.props.fields[0].name,
    isDescending: false,
  }

  public changeSearchValue(value: string) {
    this.setState({ searchValue: value, activePage: 1 })
  }

  public changeSearchKey(key: string) {
    this.setState({ searchKey: key, activePage: 1 })
  }

  public changeSort(fieldName: string) {
    this.setState({
      sortBy: fieldName,
      isDescending: !this.state.isDescending,
      activePage: 1,
    })
  }

  public changePage(page: number) {
    this.setState({ activePage: page })
  }

  public changeLimit(limit: number) {
    this.setState({ itemPerPage: limit, activePage: 1 })
  }

  public getFilteredData() {
    return this.props.data.filter((item) => {
      const currentItem = (item[this.state.searchKey] as string).toLowerCase()
      const searchValue = this.state.searchValue.toLowerCase()
      return currentItem.search(searchValue) > -1
    })
  }

  public getSortedData() {
    const sortedData = _.sortBy(this.getFilteredData(), this.state.sortBy)
    return this.state.isDescending ? sortedData.reverse() : sortedData
  }

  public getPaginatedData() {
    const offset = this.getOffset()
    const end = offset + this.state.itemPerPage
    return this.getSortedData().slice(offset, end)
  }

  public getOffset() {
    return (this.state.activePage - 1) * this.state.itemPerPage
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

        <Table celled sortable>
          <TableHeader
            fields={this.props.fields}
            sortBy={this.state.sortBy}
            isDescending={this.state.isDescending}
            onChangeSort={(fieldName) => this.changeSort(fieldName)}
          />
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
