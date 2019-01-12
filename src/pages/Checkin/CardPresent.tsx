import React, { Component, Fragment } from "react"
import {
  Button,
  Card,
  Checkbox,
  Header,
  Icon,
  Placeholder,
  Table,
} from "semantic-ui-react"

interface IProps {
  presensi: IPresensi
  anggota: IAnggota[]
  loading: boolean
  onChange: (id: string, checked: boolean) => void
  onSubmit: () => void
}

export default class CardPresent extends Component<IProps> {
  public isChecked(id: string) {
    return this.props.presensi.peserta.indexOf(id) !== -1
  }

  public getFilteredAnggota() {
    return this.props.anggota.filter((item) => {
      return (
        (item.miniclass as IMiniclass)._id ===
          (this.props.presensi.miniclass as IMiniclass)._id &&
        item.angkatan === this.props.presensi.angkatan
      )
    })
  }

  public renderTableRow() {
    return this.getFilteredAnggota().map((item, index) => (
      <Table.Row key={index}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{item.nama}</Table.Cell>
        <Table.Cell>
          <Checkbox
            checked={this.isChecked(item._id)}
            value={item._id}
            onChange={(e, { value, checked }) =>
              this.props.onChange(value as string, checked as boolean)}
          />
        </Table.Cell>
      </Table.Row>
    ))
  }

  public renderTable() {
    if (this.props.loading) {
      return (
        <Placeholder fluid>
          <Placeholder.Line length="full" style={styles.line} />
          <Placeholder.Line length="full" style={styles.line} />
          <Placeholder.Line length="full" style={styles.line} />
          <Placeholder.Line length="full" style={styles.line} />
        </Placeholder>
      )
    } else if (this.getFilteredAnggota().length === 0) {
      return (
        <Header size="huge" icon color="grey">
          <Icon name="frown outline" />
          <Header.Content>Peserta Miniclass Kosong</Header.Content>
        </Header>
      )
    } else {
      return (
        <Fragment>
          <Table selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
                <Table.HeaderCell>Kehadiran</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.renderTableRow()}</Table.Body>
          </Table>

          <Button
            content="Simpan"
            color="green"
            onClick={() => this.props.onSubmit()}
          />
        </Fragment>
      )
    }
  }

  public render() {
    return (
      <Card fluid>
        <Card.Content>{this.renderTable()}</Card.Content>
      </Card>
    )
  }
}

const styles = {
  line: {
    fontSize: 30,
  },
}
