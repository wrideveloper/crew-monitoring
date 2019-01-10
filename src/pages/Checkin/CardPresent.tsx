import React, { Component } from "react"
import { Button, Card, Checkbox, Table } from "semantic-ui-react"

interface IProps {
  presensi: IPresensi
  anggota: IAnggota[]
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

  public render() {
    return (
      <Card fluid>
        <Card.Content>
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
        </Card.Content>
      </Card>
    )
  }
}
