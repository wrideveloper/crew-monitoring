import React, { useContext } from "react"
import { Dropdown, DropdownItemProps } from "semantic-ui-react"
import { TableContext } from "../../contexts/TableContext"

const TableLimiter: React.FC = () => {
  const tableContext = useContext(TableContext)

  const options: DropdownItemProps[] = [
    {
      text: "10",
      value: 10,
    },
    {
      text: "25",
      value: 25,
    },
    {
      text: "50",
      value: 50,
    },
  ]

  return (
    <Dropdown
      floating
      text="Item Perhalaman"
      button
      options={options}
      defaultValue={options[0].value}
      onChange={(event, { value }) => tableContext.changeLimit(value as number)}
      style={styles.dropdown}
    />
  )
}

const styles = {
  dropdown: {
    margin: 5,
  },
}

export default TableLimiter
