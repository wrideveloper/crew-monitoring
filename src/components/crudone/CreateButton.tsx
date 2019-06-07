import React, { useContext } from "react"
import { Button } from "semantic-ui-react"
import { ContainerContext } from "./Container"

const CreateButton: React.FC = () => {
  const context = useContext(ContainerContext)
  return (
    <Button
      content="Tambah"
      color="green"
      onClick={() => context.openForm({}, false)}
    />
  )
}

export default CreateButton
