import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import routes from "../../routes"
import NavHeader from "./NavHeader"

interface IState {
  activeItem: string
}

class Navigation extends Component<{}, IState> {
  public state = {
    activeItem: routes[0].label,
  }

  public isActive(name: string) {
    return this.state.activeItem === name
  }

  public changeActiveItem(name: string) {
    this.setState({ activeItem: name })
  }

  public renderItems() {
    return routes.map((route, index) => (
      <Link to={route.path}>
        <Menu.Item
          key={index}
          name={route.label}
          active={this.isActive(route.label)}
          onClick={() => this.changeActiveItem(route.label)}
        />
      </Link>
    ))
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

export default Navigation
