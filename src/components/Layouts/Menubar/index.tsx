import React, { Component } from "react"
import { Dropdown, Menu } from "semantic-ui-react"
import { Consumer } from "../../../App"
import AppTitle from "./AppTitle"

class Menubar extends Component {
  public render() {
    return (
      <Consumer>
        {(context) => (
          <Menu fixed="top" inverted color="orange" borderless>
            <AppTitle />
            <Menu.Menu position="right">
              <Dropdown item text={context.user.username} pointing>
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="sign-out"
                    text="Keluar"
                    onClick={() => context.logout()}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
        )}
      </Consumer>
    )
  }
}

export default Menubar
