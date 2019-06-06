import React, { useContext, useEffect, useState } from "react"
import { Button, Grid, Header, Modal } from "semantic-ui-react"
import { DataTableContext } from ".."
import FormInput from "./FormInput"
import FormInputError from "./FormInputError"
import FormValidator from "./FormValidator"

const Form: React.FC = () => {
  const context = useContext(DataTableContext)
  const [input, setInput] = useState(context.selectedData)
  const [inputErrors, setInputErrors] = useState({} as any)

  useEffect(
    () => {
      if (context.open) {
        setInput(context.selectedData)
      } else if (!context.open) {
        setInput({})
        setInputErrors({})
      }
    },
    [context.open],
  )

  function removeError(name: string) {
    const newInputErrors = Object.assign({}, inputErrors)
    delete newInputErrors[name]
    setInputErrors(newInputErrors)
  }

  function changeInput(name: string, value: any) {
    const newInput = Object.assign({}, input)
    newInput[name] = value
    setInput(newInput)
    removeError(name)
  }

  function renderFormInputs() {
    return context.getFormFields().map((field) => (
      <Grid.Column key={field.name}>
        <FormInput
          field={field}
          onChange={(value) => changeInput(field.name, value)}
          value={input[field.name]}
          readOnly={!context.onUpdate && context.isUpdateMode}
        />
        <FormInputError errorMessage={inputErrors[field.name]} />
      </Grid.Column>
    ))
  }

  function addError(name: string, message: string) {
    const newInputErrors = Object.assign({}, inputErrors)
    newInputErrors[name] = message
    setInputErrors(newInputErrors)
  }

  function validateInputs() {
    let isValid = true
    context.getFormFields().forEach((field) => {
      if (field.validations)
        new FormValidator(field, input[field.name]).validate(
          (name, message) => {
            addError(name, message)
            isValid = false
          },
        )
    })
    return isValid
  }

  function submit() {
    if (validateInputs()) {
      if (context.isUpdateMode) context.onUpdate!(input)
      else context.onCreate!(input)
      context.closeForm()
    }
  }

  function renderSubmitButton() {
    return context.onUpdate || !context.isUpdateMode ? (
      <Button color="green" content="Simpan" onClick={submit} />
    ) : null
  }

  function renderDeleteButton() {
    return (
      context.onDelete &&
      context.isUpdateMode && (
        <Button
          content="Hapus"
          color="red"
          onClick={() => {
            context.onDelete!(input)
            context.closeForm()
          }}
        />
      )
    )
  }

  return (
    <Modal open={context.open} size="large" onClose={context.closeForm}>
      <Header content={context.isUpdateMode ? "Ubah Data" : "Tambah Data"} />
      <Modal.Content>
        <Grid columns="2">{renderFormInputs()}</Grid>
      </Modal.Content>
      <Modal.Actions>
        {renderDeleteButton()}
        {renderSubmitButton()}
      </Modal.Actions>
    </Modal>
  )
}

export default Form
