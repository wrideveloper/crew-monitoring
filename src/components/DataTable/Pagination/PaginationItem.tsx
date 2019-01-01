import React, { Component } from "react"
import { Menu } from "semantic-ui-react"

interface IProps {
  pageNumber: number
  active: boolean
  onClick: () => void
}

export default class PaginationItem extends Component<IProps> {
  public render() {
    return (
      <Menu.Item as="a" active={this.props.active} onClick={this.props.onClick}>
        {this.props.pageNumber}
      </Menu.Item>
    )
  }
}
