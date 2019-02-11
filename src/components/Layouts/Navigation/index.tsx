import React, { Component } from "react"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import routes from "../../../routes"
import NavHeader from "./NavHeader"

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
            as="span"
            name={route.label}
            active={this.isActive(route)}
            onClick={() => this.changeActiveItem(route.label!)}
          />
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
        <NavHeader text="Manajemen Crew" icon="user circle outline" />
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
