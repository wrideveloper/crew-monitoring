import React, { Component } from "react"
import { Menu } from "semantic-ui-react"
import NavHeader from "./NavHeader"

interface IState {
  activeItem: string
}

const itemsCrew = ["daftar_crew", "divisi", "jabatan"]
const itemsMiniclass = ["daftar_miniclass", "presensi"]

class Navigation extends Component<{}, IState> {
  public state = {
    activeItem: itemsCrew[0],
  }

  public isActive(name: string) {
    return this.state.activeItem === name
  }

  public changeActiveItem(name: string) {
    this.setState({ activeItem: name })
  }

  public renderItems(items: string[]) {
    return items.map((item, index) => (
      <Menu.Item
        key={index}
        name={item}
        active={this.isActive(item)}
        onClick={() => this.changeActiveItem(item)}
      />
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
        {this.renderItems(itemsCrew)}

        <NavHeader text="Manajemen Miniclass" icon="lightbulb outline" />
        {this.renderItems(itemsMiniclass)}
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
