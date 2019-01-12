import React, { Component, Fragment } from "react"
import { Card, Placeholder } from "semantic-ui-react"

interface IProps {
  presensi: IPresensi
  loading: boolean
}

export default class CardInfo extends Component<IProps> {
  public getMiniclass() {
    return (this.props.presensi.miniclass as IMiniclass).nama
  }

  public getDate() {
    return new Date(this.props.presensi.tanggal).toLocaleDateString("id")
  }

  public getTopic() {
    return this.props.presensi.topik
  }

  public renderInfo() {
    return this.props.loading ? (
      <Placeholder fluid>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder>
    ) : (
      <Fragment>
        <Card.Header content={this.getMiniclass()} />
        <Card.Meta content={this.getDate()} />
        <Card.Description content={this.getTopic()} />
      </Fragment>
    )
  }

  public render() {
    return (
      <Card>
        <Card.Content>{this.renderInfo()}</Card.Content>
      </Card>
    )
  }
}
