import _ from "lodash"
import React, { Fragment, useContext, useState } from "react"
import { Card, Grid, Table } from "semantic-ui-react"
import { DataTableContext } from "../DataTable"
import TableBlank from "./TableBlank"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"
import TableLimiter from "./TableLimiter"
import TableLoading from "./TableLoading"
import TablePagination from "./TablePagination"
import TableSearch from "./TableSearch"

interface IProps {
  data: any[]
  loading?: boolean
}

const CustomTable: React.FC<IProps> = (props) => {
  const context = useContext(DataTableContext)
  const [activePage, setActivePage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState("")
  const [searchKey, setSearchKey] = useState(context.getTableFields()[0].name)
  const [sortKey, setSortKey] = useState(context.getTableFields()[0].name)
  const [isDescending, setIsDescending] = useState(false)

  function changeSearchValue(value: string) {
    setSearchValue(value)
    setActivePage(1)
  }

  function changeSearchKey(key: string) {
    setSearchKey(key)
    setActivePage(1)
  }

  function changeLimit(limit: number) {
    setItemPerPage(limit)
    setActivePage(1)
  }

  function changeSort(fieldName: string) {
    setSortKey(fieldName)
    setIsDescending(!isDescending)
    setActivePage(1)
  }

  function changePage(page: number) {
    setActivePage(page)
  }

  function getSortedData() {
    const sortedData = _.sortBy(getSearchedData(), sortKey)
    return isDescending ? sortedData.reverse() : sortedData
  }

  function getOffset() {
    return (activePage - 1) * itemPerPage
  }

  function getPaginatedData() {
    const offset = getOffset()
    const end = offset + itemPerPage
    return getSortedData().slice(offset, end)
  }

  function getFieldBySearchKey() {
    return context.getTableFields().find((field) => field.name === searchKey)
  }

  function getCellText(cellData: any) {
    const field = getFieldBySearchKey()
    if (field!.type === "option") {
      return String(cellData[field!.optionData!.textKey])
    } else if (field!.type === "date") {
      return new Date(cellData).toLocaleDateString("id")
    } else {
      return String(cellData)
    }
  }

  function getSearchedData() {
    return props.data.filter((rowData) => {
      const cellData = rowData[searchKey]
      const cellText = getCellText(cellData).toLowerCase()
      return cellText.search(searchValue.toLowerCase()) > -1
    })
  }

  function renderTable() {
    if (props.loading) {
      return <TableLoading />
    } else if (getSearchedData().length === 0) {
      return <TableBlank />
    } else {
      return (
        <Fragment>
          <Table celled sortable selectable>
            <TableHeader
              fields={context.getTableFields()}
              sortKey={sortKey}
              isDescending={isDescending}
              onChangeSort={changeSort}
            />
            <TableBody
              fields={context.getTableFields()}
              paginatedData={getPaginatedData()}
              startingNumber={getOffset() + 1}
              onRowClick={(rowData) => {
                context.openForm(Object.assign({}, rowData), true)
              }}
            />
          </Table>

          <TablePagination
            dataLength={getSearchedData().length}
            itemPerPage={itemPerPage}
            activePage={activePage}
            onPageChange={changePage}
          />
        </Fragment>
      )
    }
  }

  return (
    <Card fluid>
      <Card.Content>
        <Grid columns="2">
          <Grid.Column>
            <TableSearch
              searchValue={searchValue}
              searchKey={searchKey}
              fields={context.getTableFields()}
              onChangeSearchValue={changeSearchValue}
              onChangeSearchKey={changeSearchKey}
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <TableLimiter onChange={changeLimit} />
          </Grid.Column>
        </Grid>
        {renderTable()}
      </Card.Content>
    </Card>
  )
}

export default CustomTable
