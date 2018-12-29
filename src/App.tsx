import React, { Component, Fragment } from "react"
import { Grid } from "semantic-ui-react"
import Content from "./layouts/Content"
import Menubar from "./layouts/Menubar"
import Navigation from "./layouts/Navigation"

class App extends Component {
  public render() {
    return (
      <Fragment>
        <Grid columns="2" style={styles.container}>
          <Grid.Column width="3">
            <Navigation />
          </Grid.Column>
          <Grid.Column>
            <Menubar />
            <Content />
          </Grid.Column>
        </Grid>
      </Fragment>
    )
  }
}

const styles = {
  container: {
    paddingTop: 50,
  },
}

export default App
