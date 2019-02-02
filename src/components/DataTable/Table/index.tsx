import _ from "lodash"
import React, { Component, Fragment } from "react"
import { Card, Grid, Table } from "semantic-ui-react"
import TableBlank from "./TableBlank"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"
import TableLimiter from "./TableLimiter"
import TableLoading from "./TableLoading"
import TablePagination from "./TablePagination"
import TableSearch from "./TableSearch"

interface IProps {
  data: any[]
  loading: boolean
  shownFields: IField[]
  onRowClick: (rowData: any) => void
}

interface IState {
  activePage: number
  itemPerPage: number
  searchValue: string
  searchKey: string
  sortKey: string
  isDescending: boolean
}

export default class CustomTable extends Component<IProps, IState> {
  public state: IState = {
    activePage: 1,
    itemPerPage: 10,
    searchValue: "",
    searchKey: this.props.shownFields[0].name,
    sortKey: this.props.shownFields[0].name,
    isDescending: false,
  }

  public changeSearchValue(value: string) {
    this.setState({ searchValue: value, activePage: 1 })
  }

  public changeSearchKey(key: string) {
    this.setState({ searchKey: key, activePage: 1 })
  }

  public changeSort(fieldName: string) {
    this.setState((prevState) => ({
      sortKey: fieldName,
      isDescending: !prevState.isDescending,
      activePage: 1,
    }))
  }

  public changePage(page: number) {
    this.setState({ activePage: page })
  }

  public changeLimit(limit: number) {
    this.setState({ itemPerPage: limit, activePage: 1 })
  }

  public getFieldBySearchKey() {
    return this.props.shownFields.find((field) => field.name === this.state.searchKey)
  }

  public getCellText(cellData: any): string {
    const field = this.getFieldBySearchKey()
    if (field!.type === "option") {
      return String(cellData[field!.optionData!.textKey])
    } else if (field!.type === "date") {
      return new Date(cellData).toLocaleDateString("id")
    } else {
      return String(cellData)
    }
  }

  public getSearchedData() {
    return this.props.data.filter((rowData) => {
      const cellData = rowData[this.state.searchKey]
      const cellText = this.getCellText(cellData).toLowerCase()
      const searchValue = this.state.searchValue.toLowerCase()
      return cellText.search(searchValue) > -1
    })
  }

  public getSortedData() {
    const sortedData = _.sortBy(this.getSearchedData(), this.state.sortKey)
    return this.state.isDescending ? sortedData.reverse() : sortedData
  }

  public getOffset() {
    return (this.state.activePage - 1) * this.state.itemPerPage
  }

  public getPaginatedData() {
    const offset = this.getOffset()
    const end = offset + this.state.itemPerPage
    return this.getSortedData().slice(offset, end)
  }

  public renderTable() {
    if (this.props.loading) {
      return <TableLoading />
    } else if (this.getSearchedData().length === 0) {
      return <TableBlank />
    } else {
      return (
        <Fragment>
          <Table celled sortable selectable>
            <TableHeader
              shownFields={this.props.shownFields}
              sortKey={this.state.sortKey}
              isDescending={this.state.isDescending}
              onChangeSort={(fieldName) => this.changeSort(fieldName)}
            />
            <TableBody
              shownFields={this.props.shownFields}
              paginatedData={this.getPaginatedData()}
              startingNumber={this.getOffset() + 1}
              onRowClick={(rowData) => this.props.onRowClick(rowData)}
            />
          </Table>

          <TablePagination
            dataLength={this.getSearchedData().length}
            itemPerPage={this.state.itemPerPage}
            activePage={this.state.activePage}
            onPageChange={(pageNumber) => this.changePage(pageNumber)}
          />
        </Fragment>
      )
    }
  }

  public render() {
    return (
      <Card fluid>
        <Card.Content>
          <Grid columns="2">
            <Grid.Column>
              <TableSearch
                searchValue={this.state.searchValue}
                searchKey={this.state.searchKey}
                shownFields={this.props.shownFields}
                onChangeSearchValue={(value) => this.changeSearchValue(value)}
                onChangeSearchKey={(key) => this.changeSearchKey(key)}
              />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <TableLimiter onChange={(limit) => this.changeLimit(limit)} />
            </Grid.Column>
          </Grid>
          {this.renderTable()}
        </Card.Content>
      </Card>
    )
  }
}
