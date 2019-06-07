import React, { Component } from "react"
import { Card, Header, Icon } from "semantic-ui-react"

export default class TableBlank extends Component {
  public render() {
    return (
      <Card fluid style={styles.card}>
        <Card.Content>
          <Header size="huge" icon color="grey">
            <Icon name="frown outline" />
            <Header.Content>Data Tidak Ditemukan</Header.Content>
          </Header>
        </Card.Content>
      </Card>
    )
  }
}

const styles = {
  card: {
    paddingTop: 50,
    paddingBottom: 50,
  },
}
