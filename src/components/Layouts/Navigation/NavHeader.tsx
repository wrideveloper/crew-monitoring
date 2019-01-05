import React, { Component } from "react"
import { Header, Icon, Menu } from "semantic-ui-react"
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic"

interface IProps {
  text: string
  icon: SemanticICONS
}

class NavHeader extends Component<IProps> {
  public render() {
    return (
      <Menu.Item header>
        <Header size="small">
          <Icon name={this.props.icon} />
          <Header.Content>{this.props.text}</Header.Content>
        </Header>
      </Menu.Item>
    )
  }
}

export default NavHeader
