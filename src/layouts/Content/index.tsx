import React, { Component } from "react"
import { Card } from "semantic-ui-react"

class Content extends Component {
  public render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Lorem Ipsum Dolor</Card.Header>
          <Card.Description>Lorem Ipsum Dolor</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default Content
