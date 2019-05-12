import React, { Component, Fragment } from "react"
import { Image, Input } from "semantic-ui-react"
import { api } from "../../../config"

interface IProps {
  field: IField
  onChange: (value: any) => void
  value: any
  readOnly: boolean
}

interface IState {
  preview: string
}

export default class InputImage extends Component<IProps, IState> {
  public state: IState = {
    preview: api.serviceCrew + this.props.value,
  }

  public changeImage(file: File) {
    this.props.onChange(file)
    URL.revokeObjectURL(this.state.preview)
    this.setState({ preview: URL.createObjectURL(file) })
  }

  public render() {
    return (
      <Fragment>
        {this.props.value ? (
          <Image src={this.state.preview} rounded size="small" />
        ) : null}

        <br />
        <Input
          label={this.props.field.label}
          fluid
          type="file"
          onChange={(event) => this.changeImage(event.target.files![0])}
          readOnly={this.props.readOnly}
        />
      </Fragment>
    )
  }
}
