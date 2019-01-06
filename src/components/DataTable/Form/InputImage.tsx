import React, { Component, Fragment } from "react"
import { Image, Input } from "semantic-ui-react"
import { serviceCrew } from "../../../config"

interface IProps {
  field: IField
  onChange: (value: any) => void
  value: any
}

interface IState {
  preview: string
}

export default class InputImage extends Component<IProps, IState> {
  public state: IState = {
    preview: serviceCrew + this.props.value,
  }

  public changeImage(file: File) {
    this.props.onChange(file)
    URL.revokeObjectURL(this.state.preview)
    this.setState({ preview: URL.createObjectURL(file) })
  }

  public render() {
    return (
      <Fragment>
        <Image src={this.state.preview} rounded size="small" />
        <br />
        <Input
          label={this.props.field.label}
          fluid
          type="file"
          onChange={(event) => this.changeImage(event.target.files![0])}
        />
      </Fragment>
    )
  }
}
