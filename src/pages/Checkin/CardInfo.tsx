import React, { Component } from "react"
import { Card } from "semantic-ui-react"

interface IProps {
  presensi: IPresensi
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

  public render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header content={this.getMiniclass()} />
          <Card.Meta content={this.getDate()} />
          <Card.Description content={this.getTopic()} />
        </Card.Content>
      </Card>
    )
  }
}
