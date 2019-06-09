import React, { Component } from "react"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"
import { Header, Menu } from "semantic-ui-react"
import { Consumer } from "../../../App"
import { routes } from "../../../config"

interface IState {
  activeItem: string
}

class Navigation extends Component<RouteComponentProps, IState> {
  public state: IState = {
    activeItem: "",
  }

  public isActive(route: IRoute) {
    return (
      this.state.activeItem === route.label ||
      this.props.location.pathname.includes(route.path)
    )
  }

  public changeActiveItem(name: string) {
    this.setState({ activeItem: name })
  }

  public renderItems(context: IAppContext) {
    return routes.map((route) => {
      return (
        !route.hide &&
        context.user.level.hakAkses.includes(route.name) && (
          <Menu.Item
            key={route.label}
            as={Link}
            to={route.path}
            active={this.isActive(route)}
            onClick={() => this.changeActiveItem(route.label!)}
          >
            <Header content={route.label} icon={route.icon} size="tiny" />
          </Menu.Item>
        )
      )
    })
  }

  public render() {
    return (
      <Consumer>
        {(context) => (
          <Menu
            vertical
            size="large"
            fixed="left"
            secondary
            pointing
            style={styles.container}
          >
            {this.renderItems(context)}
          </Menu>
        )}
      </Consumer>
    )
  }
}

const styles = {
  container: {
    paddingTop: 50,
  },
}

export default withRouter(Navigation)
