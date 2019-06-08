export interface IContainerContext {
  getTableFields: () => IField[]
  getFormFields: () => IField[]
  open: boolean
  selectedData: any
  isUpdateMode: boolean
  openForm: (selectedData: any, isUpdateMode: boolean) => void
  closeForm: () => void
}

export interface IOptionData {
  data: any[]
  textKey: string
  valueKey: string
}

export enum Validation {
  required = "required",
  email = "email",
  alpha = "alpha",
  numeric = "numeric",
}

export interface ISchema {
  [s: string]: ISchemaItem
}

export interface ISchemaItem {
  label: string
  type?: "text" | "password" | "option" | "image" | "date"
  validations?: string[]
  optionData?: IOptionData
  hideOnTable?: boolean
  hideOnForm?: boolean
}

export interface IField {
  name: string
  label: string
  type?: "text" | "password" | "option" | "image" | "date"
  validations?: string[]
  optionData?: IOptionData
  hideOnTable?: boolean
  hideOnForm?: boolean
}
