import React, { useContext } from "react"
import { Button } from "semantic-ui-react"
import { CrudoneContext } from "../contexts/CrudoneContext"

interface IProps {
  text?: string
}

const CreateButton: React.FC<IProps> = (props) => {
  const context = useContext(CrudoneContext)
  return (
    <Button
      content={props.text || "Add New"}
      color="green"
      onClick={() => context.openForm({}, false)}
    />
  )
}

export default CreateButton
