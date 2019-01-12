import React, { Component } from "react"
import { Message } from "semantic-ui-react"

interface IProps {
  error: Error | undefined
  onDismiss: () => void
}

export default class ErrorMessage extends Component<IProps> {
  public render() {
    return this.props.error ? (
      <Message negative onDismiss={() => this.props.onDismiss()}>
        <Message.Header>Ups Terjadi Kesalahan</Message.Header>
        <p>{this.props.error.message}</p>
      </Message>
    ) : null
  }
}
