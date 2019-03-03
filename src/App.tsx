import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import Menubar from "./components/Layouts/Menubar"
import Navigation from "./components/Layouts/Navigation"
import PrivateRoute from "./components/PrivateRoute"
import routes from "./routes"

const context = React.createContext<IAppContext | null>(null)
const { Provider, Consumer } = context

interface IState {
  token: string
}

class App extends Component {
  public state: IState = {
    token: localStorage.getItem("authToken") || "",
  }

  public setToken = (token: string) => {
    this.setState({ token })
    localStorage.setItem("authToken", token)
  }

  public isLoggedIn = () => {
    return this.state.token !== ""
  }

  public renderRoutes() {
    return routes.map((route, index) =>
      route.private ? (
        <PrivateRoute
          path={route.path}
          component={route.component}
          key={index}
          exact
        />
      ) : (
        <Route
          path={route.path}
          component={route.component}
          key={index}
          exact
        />
      ),
    )
  }

  public render() {
    const providerValue = {
      token: this.state.token,
      setToken: this.setToken,
      isLoggedIn: this.isLoggedIn,
    }
    return (
      <Provider value={providerValue}>
        <BrowserRouter basename="/pamdal">
          <Grid columns="2" style={styles.container}>
            {this.isLoggedIn() ? (
              <Grid.Column width="3">
                <Navigation />
              </Grid.Column>
            ) : null}

            <Grid.Column width="13">
              {this.isLoggedIn() ? <Menubar /> : null}
              <div style={styles.pageContainer}>{this.renderRoutes()}</div>
            </Grid.Column>
          </Grid>
        </BrowserRouter>
      </Provider>
    )
  }
}

const styles = {
  container: {
    height: "100vh",
    paddingTop: 50,
    justifyContent: "center",
  },
  pageContainer: {
    padding: 25,
    height: "100%",
  },
}

export { Consumer }
export default App
