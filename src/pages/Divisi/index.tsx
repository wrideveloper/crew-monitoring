import axios from "axios"
import React, { Component } from "react"
import DataTable from "../../components/DataTable"

interface IState {
  divisi: IDivisi[]
}

const fields: IField[] = [
  {
    name: "nama",
    label: "Nama Divisi",
  },
]

export default class Divisi extends Component<{}, IState> {
  public state: IState = {
    divisi: [],
  }

  public componentDidMount() {
    axios
      .get("https://crew-data-management.herokuapp.com/divisi")
      .then((response) => {
        const data = response.data
        this.setState({
          divisi: data,
        })
      })
  }

  public render() {
    return <DataTable data={this.state.divisi} fields={fields} />
  }
}
