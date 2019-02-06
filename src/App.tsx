import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import Menubar from "./components/Layouts/Menubar"
import Navigation from "./components/Layouts/Navigation"
import routes from "./routes"

class App extends Component {
  public renderRoutes() {
    return routes.map((route, index) => (
      <Route path={route.path} component={route.component} key={index} exact />
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
            <div style={styles.pageContainer}>{this.renderRoutes()}</div>
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
  pageContainer: {
    padding: 25,
  },
}

export default App
