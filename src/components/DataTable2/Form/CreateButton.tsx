import React, { useContext } from "react"
import { Button } from "semantic-ui-react"
import { DataTableContext } from "../index"

const CreateButton: React.FC = () => {
  const context = useContext(DataTableContext)

  return context.onCreate ? (
    <Button
      content="Tambah"
      color="green"
      onClick={() => context.openForm({}, false)}
    />
  ) : null
}

export default CreateButton
