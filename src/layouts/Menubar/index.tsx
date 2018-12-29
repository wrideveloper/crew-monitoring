import React, { Component } from "react"
import { Dropdown, Menu } from "semantic-ui-react"
import AppTitle from "./AppTitle"

class Menubar extends Component {
  public render() {
    return (
      <Menu fixed="top" inverted color="orange" borderless>
        <AppTitle />
        <Menu.Menu position="right">
          <Dropdown item text="Administrator" pointing>
            <Dropdown.Menu>
              <Dropdown.Item icon="user outline" text="Profil" />
              <Dropdown.Item icon="sign-out" text="Keluar" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Menubar
