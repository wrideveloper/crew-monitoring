import React, { useContext } from "react"
import { Button } from "semantic-ui-react"
import { CrudoneContext } from "../contexts/CrudoneContext"

const CreateButton: React.FC = () => {
  const context = useContext(CrudoneContext)
  return (
    <Button
      content="Tambah"
      color="green"
      onClick={() => context.openForm({}, false)}
    />
  )
}

export default CreateButton
