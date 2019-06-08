import React, { useContext, useEffect } from "react"
import { Button, Dropdown, DropdownItemProps, Label } from "semantic-ui-react"
import { TableContext } from "../../contexts/TableContext"

interface IProps {
  limits?: number[]
  text?: string
}

const TableLimiter: React.FC<IProps> = (props) => {
  const tableContext = useContext(TableContext)

  useEffect(
    () => tableContext.changeLimit(props.limits ? props.limits[0] : 10),
    [props.limits],
  )

  function mapPropsToDropdownItem(): DropdownItemProps[] {
    const limits = props.limits || [10, 25, 50]
    return limits.map((limit) => ({ text: limit, value: limit }))
  }

  return (
    <Button.Group style={styles.container}>
      <Label
        size="large"
        content={props.text || "Item Per Page"}
        style={styles.label}
      />
      <Dropdown
        basic
        selection
        button
        floating
        options={mapPropsToDropdownItem()}
        defaultValue={mapPropsToDropdownItem()[0].value}
        onChange={(event, { value }) =>
          tableContext.changeLimit(value as number)}
        style={styles.dropdown}
      />
    </Button.Group>
  )
}

const styles = {
  container: {
    margin: 5,
  },
  label: {
    marginRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    display: "flex",
    alignItems: "center",
  },
  dropdown: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}

export default TableLimiter
