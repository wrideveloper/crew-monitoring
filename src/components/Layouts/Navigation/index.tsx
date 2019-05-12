import React, { Component } from "react"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"
import { Header, Menu } from "semantic-ui-react"
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

  public renderItems() {
    return routes.map((route, index) => {
      return route.hide ? null : (
        <Link to={route.path} key={index}>
          <Menu.Item
            active={this.isActive(route)}
            onClick={() => this.changeActiveItem(route.label!)}
          >
            <Header content={route.label} icon={route.icon} size="tiny" />
          </Menu.Item>
        </Link>
      )
    })
  }

  public render() {
    return (
      <Menu
        vertical
        size="large"
        fixed="left"
        secondary
        pointing
        style={styles.container}
      >
        {this.renderItems()}
      </Menu>
    )
  }
}

const styles = {
  container: {
    paddingTop: 50,
  },
}

export default withRouter(Navigation)
