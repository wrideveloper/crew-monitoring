import React, { useContext } from "react"
import { Button } from "semantic-ui-react"
import { DataTableContext } from "./DataTable"

const CreateButton: React.FC = () => {
  const context = useContext(DataTableContext)
  return (
    <Button
      content="Tambah"
      color="green"
      onClick={() => context.openForm({}, false)}
    />
  )
}

export default CreateButton
