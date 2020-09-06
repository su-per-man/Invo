import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Fab, Zoom, IconButton, Tooltip,
  Dialog, DialogActions, DialogTitle, DialogContent, Button, DialogContentText
} from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons'
import FormDialog from './FormDialog'
import { DynamicForm } from '../SharedConstants'

const CRUDModes = {
  Create: 'Create',
  Edit: 'Edit',
  Delete: 'Delete',
}

const columns = [
  { id: 'Name', label: 'Name', objectType: DynamicForm.TextField },
  { id: 'Location', label: 'Location', objectType: DynamicForm.TextField },
  { id: 'Description', label: 'Description', objectType: DynamicForm.TextField },
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
      openCEDialog: false,
      mode: null,
      openConfirmDelete: false,
      rowsPerPage: 10,
      id: null
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

  handleDialogOpen = (param) => {
    this.setState({ mode: param.mode })
    switch (param.mode) {
      case CRUDModes.Delete:
        this.setState({ openConfirmDelete: true, id: param.id })
        break
      case CRUDModes.Create:
        this.setState({ openCEDialog: true })
        break

    }
  }
  handleDialogDismiss = () => {
    return (this.setState({
      openCEDialog: false,
      openConfirmDelete: false
    }));
  }
  handleDelete = () => {
    this.props.onDelete(this.props.collectionName, this.state.id)
    this.handleDialogDismiss()
  }
  handleSave = (formData) => {
    switch (this.state.mode) {
      case CRUDModes.Create:
        this.props.onCreate(this.props.collectionName, formData)
    }
    this.handleDialogDismiss()
  }

  render() {
    return (
      <React.Fragment>

        <Dialog open={this.state.openConfirmDelete} onClose={this.handleDialogDismiss}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deleting this will clear all history releated to this
          </DialogContentText>
            <DialogActions>
              <Button onClick={this.handleDialogDismiss} color="primary">Cancel</Button>
              <Button onClick={this.handleDelete} color="secondary" variant="contained" disableElevation autoFocus>Delete</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <FormDialog trigger={this.state.openCEDialog} formFields={columns} title={this.state.mode}
          onDismiss={this.handleDialogDismiss} onSave={this.handleSave} />
        <div className="fab">
          <Zoom in={true} unmountOnExit={true} style={{ transitionDelay: '1s' }} >
            <Tooltip title="Add">
              <Fab color="primary" onClick={this.handleDialogOpen.bind(this, { mode: CRUDModes.Create })}><Add /></Fab>
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
                          <IconButton onClick={this.handleDialogOpen.bind(this, { mode: CRUDModes.Edit, id: row.id })}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={this.handleDialogOpen.bind(this, { mode: CRUDModes.Delete, id: row._id })}>
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