import React, { Component } from "react"
import { Card } from "semantic-ui-react"

interface IProps {
  presensi: IPresensi
}

export default class CardInfo extends Component<IProps> {
  public render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header content={this.props.presensi.miniclass.nama} />
          <Card.Meta
            content={new Date(this.props.presensi.tanggal).toLocaleDateString(
              "id",
            )}
          />
          <Card.Description content={this.props.presensi.topik} />
        </Card.Content>
      </Card>
    )
  }
}
