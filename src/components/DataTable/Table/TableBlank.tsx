import React, { Component } from "react"
import { Header, Icon } from "semantic-ui-react"

export default class TableBlank extends Component {
  public render() {
    return (
      <Header size="huge" icon color="grey" style={styles.header}>
        <Icon name="frown outline" />
        <Header.Content>Data Tidak Ditemukan</Header.Content>
      </Header>
    )
  }
}

const styles = {
  header: {
    marginVertical: 100,
    marginHorizontal: "auto",
  },
}
