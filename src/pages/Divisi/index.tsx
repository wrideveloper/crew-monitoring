import axios from "axios"
import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
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

  public addDivisi(input: any) {
    const { divisi } = this.state
    divisi.push(input)
    this.setState({ divisi })
  }

  public render() {
    return (
      <Fragment>
        <Header content="Divisi" subheader="Kumpulan data divisi" />
        <DataTable
          data={this.state.divisi}
          fields={fields}
          onCreate={(input) => console.log("create : ", input)}
          onUpdate={(input) => console.log("update : ", input)}
          onDelete={(input) => console.log("delete : ", input)}
        />
      </Fragment>
    )
  }
}
