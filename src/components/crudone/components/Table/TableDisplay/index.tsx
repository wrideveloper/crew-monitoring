import React, { useContext } from "react"
import { Table } from "semantic-ui-react"
import { CrudoneContext } from "../../../contexts/CrudoneContext"
import { TableContext } from "../../../contexts/TableContext"
import TableBlank from "./TableBlank"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"
import TableLoading from "./TableLoading"
import TablePagination from "./TablePagination"

interface IProps {
  emptyText?: string
}

const TableDisplay: React.FC<IProps> = (props) => {
  const tableContext = useContext(TableContext)
  const crudoneContext = useContext(CrudoneContext)

  if (tableContext.loading) {
    return <TableLoading />
  } else if (tableContext.getSearchedData().length === 0) {
    return <TableBlank emptyText={props.emptyText} />
  } else {
    return (
      <>
        <Table celled sortable selectable style={styles.table}>
          <TableHeader
            fields={crudoneContext.getTableFields()}
            sortKey={tableContext.sortKey}
            isDescending={tableContext.isDescending}
            onChangeSort={tableContext.changeSort}
          />
          <TableBody
            fields={crudoneContext.getTableFields()}
            paginatedData={tableContext.getPaginatedData()}
            startingNumber={tableContext.getOffset() + 1}
            onRowClick={(rowData: any) => {
              crudoneContext.openForm(Object.assign({}, rowData), true)
            }}
          />
        </Table>

        <TablePagination
          dataLength={tableContext.getSearchedData().length}
          itemPerPage={tableContext.itemPerPage}
          activePage={tableContext.activePage}
          onPageChange={tableContext.changePage}
        />
      </>
    )
  }
}

const styles = {
  table: {
    margin: 5,
  },
}

export default TableDisplay
