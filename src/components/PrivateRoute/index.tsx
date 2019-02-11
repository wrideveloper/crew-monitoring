import React, { Component } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { Consumer } from "../../App"

export default class PrivateRoute extends Component<RouteProps> {
  public render() {
    return (
      <Consumer>
        {(context) =>
          context!.isLoggedIn() ? (
            <Route {...this.props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: this.props.location } }}
            />
          )
        }
      </Consumer>
    )
  }
}
