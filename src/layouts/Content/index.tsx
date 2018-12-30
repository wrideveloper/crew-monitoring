import React, { Component } from "react"
import { Card } from "semantic-ui-react"

class Content extends Component {
  public render() {
    return (
      <Card fluid>
        <Card.Content>{this.props.children}</Card.Content>
      </Card>
    )
  }
}

export default Content
