import React, { Component } from "react"
import { Card, Placeholder } from "semantic-ui-react"

export default class TableLoading extends Component {
  public render() {
    return (
      <Card fluid>
        <Card.Content>
          <Placeholder fluid>
            <Placeholder.Line length="full" style={styles.line} />
            <Placeholder.Line length="full" style={styles.line} />
            <Placeholder.Line length="full" style={styles.line} />
            <Placeholder.Line length="full" style={styles.line} />
            <Placeholder.Line length="full" style={styles.line} />
          </Placeholder>
        </Card.Content>
      </Card>
    )
  }
}

const styles = {
  line: {
    fontSize: 30,
  },
}
