import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Fab, Zoom, IconButton, Tooltip
} from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons'
import FormDialog from './FormDialog'

const columns = [
  { id: 'Name', label: 'Name' },
  { id: 'Location', label: 'Location' },
  { id: 'Description', label: 'Description' },
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   const X = "suman"
//   return { name, code, population, size, density, X };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

export default class StickyHeadTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      openDialog: false,
      rowsPerPage: 10
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage })
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: +event.target.value
    })
  };

  handleDialogOpen = (val) => {
    this.setState({ openDialog: true })
  }
  handleDialogDismiss = () => {
    return (this.setState({ openDialog: false }));
  }

  render() {
    return (
      <React.Fragment>
        <FormDialog trigger={this.state.openDialog} onDismiss={this.handleDialogDismiss} />
        <div className="fab">
          <Zoom in={true} unmountOnExit={true} style={{ transitionDelay: '1s' }} >
            <Tooltip title="Add">
              <Fab color="primary"><Add /></Fab>
            </Tooltip>
          </Zoom>
        </div>
        <Paper>
          <TableContainer className="stickyTableContainer">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Actions</TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton onClick={this.handleDialogOpen.bind(this, { mode: 'Edit', id: row.id })}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={this.handleDialogOpen.bind(this, { mode: 'Delete', id: row.id })}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      {columns.map((column) => {
                        return (
                          <TableCell>
                            {row[column.id]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            count={this.props.rows.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </React.Fragment >
    );
  }
}