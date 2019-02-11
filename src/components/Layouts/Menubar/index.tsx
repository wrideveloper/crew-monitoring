import React, { Component } from "react"
import { Dropdown, Menu } from "semantic-ui-react"
import { Consumer } from "../../../App"
import AppTitle from "./AppTitle"

class Menubar extends Component {
  public logout(context: IAppContext) {
    context.setToken("")
  }

  public render() {
    return (
      <Consumer>
        {(context) => (
          <Menu fixed="top" inverted color="orange" borderless>
            <AppTitle />
            <Menu.Menu position="right">
              <Dropdown item text="Administrator" pointing>
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="sign-out"
                    text="Keluar"
                    onClick={() => this.logout(context!)}
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
