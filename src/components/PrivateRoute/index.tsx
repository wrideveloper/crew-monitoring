import React, { Component } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { Consumer } from "../../App"

interface IProps extends RouteProps {
  name: string
}

export default class PrivateRoute extends Component<IProps> {
  public render() {
    return (
      <Consumer>
        {(context) => {
          if (!context.isLoggedIn()) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: this.props.location },
                }}
              />
            )
          } else if (!context.user.level.hakAkses.includes(this.props.name)) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: this.props.location },
                }}
              />
            )
          } else {
            return <Route {...this.props} />
          }
        }}
      </Consumer>
    )
  }
}
