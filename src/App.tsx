import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import Menubar from "./components/Layouts/Menubar"
import Navigation from "./components/Layouts/Navigation"
import PrivateRoute from "./components/PrivateRoute"
import { routes } from "./config"

const context = React.createContext<IAppContext>({
  token: "",
  user: {} as IAdmin,
  login: () => undefined,
  logout: () => undefined,
  isLoggedIn: () => false,
})

const { Provider, Consumer } = context

interface IState {
  token: string
  user: IAdmin
}

class App extends Component {
  public state: IState = {
    token: localStorage.getItem("authToken") || "",
    user: JSON.parse(localStorage.getItem("authUser") || "{}"),
  }

  public login = (token: string, user: IAdmin, callback: () => void) => {
    this.setState({ token, user }, () => {
      localStorage.setItem("authToken", token)
      localStorage.setItem("authUser", JSON.stringify(user))
      callback()
    })
  }

  public logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("authUser")
    this.setState({ token: undefined, user: undefined })
    window.location.href = "/"
  }

  public isLoggedIn = () => {
    return this.state.token !== ""
  }

  public renderRoutes() {
    return routes.map((route) => {
      const AppRoute = route.private ? PrivateRoute : Route
      return (
        <AppRoute
          name={route.name}
          path={route.path}
          component={route.component}
          exact
          key={route.path}
        />
      )
    })
  }

  public render() {
    const providerValue: IAppContext = {
      token: this.state.token,
      user: this.state.user,
      login: this.login,
      logout: this.logout,
      isLoggedIn: this.isLoggedIn,
    }
    return (
      <Provider value={providerValue}>
        <BrowserRouter>
          <Grid columns="2" style={styles.container}>
            {this.isLoggedIn() && (
              <Grid.Column width="3">
                <Navigation />
              </Grid.Column>
            )}

            <Grid.Column width="13">
              {this.isLoggedIn() && <Menubar />}
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
