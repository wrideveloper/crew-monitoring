import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import Menubar from "./layouts/Menubar"
import Navigation from "./layouts/Navigation"
import routes from "./routes"

class App extends Component {
  public renderRoutes() {
    return routes.map((route, index) => (
      <Route path={route.path} component={route.component} key={index} />
    ))
  }

  public render() {
    return (
      <BrowserRouter>
        <Grid columns="2" style={styles.container} padded="horizontally">
          <Grid.Column width="3">
            <Navigation />
          </Grid.Column>
          <Grid.Column width="13">
            <Menubar />
            {this.renderRoutes()}
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    )
  }
}

const styles = {
  container: {
    paddingTop: 50,
  },
}

export default App
