import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Fab, Zoom, IconButton, Tooltip,
  Dialog, DialogActions, DialogTitle, DialogContent, Button, DialogContentText
} from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons'
import FormDialog from './FormDialog'
import { DynamicForm, CRUDModes } from '../SharedConstants'

const columns = [
  { id: 'Name', label: 'Name', objectType: DynamicForm.TextField, required: true },
  { id: 'Location', label: 'Location', objectType: DynamicForm.TextField },
  { id: 'Description', label: 'Description', objectType: DynamicForm.TextField },
];

export default class StickyHeadTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      openCEDialog: false,
      mode: null,
      formData: null,
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
      case CRUDModes.Create:
        this.setState({ openCEDialog: true })
        break
      case CRUDModes.Update:
        this.setState({ openCEDialog: true, id: param.id, formData: param.rowData })
        break
      case CRUDModes.Delete:
        this.setState({ openConfirmDelete: true, id: param.id })
        break
      default:
        console.log('Error in CRUDTable')
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
        break
      case CRUDModes.Update:
        this.props.onUpdate(this.props.collectionName, this.state.id, formData)
        break
      default:
        console.log('Error in CRUDTable')
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

        <FormDialog trigger={this.state.openCEDialog} formFields={columns} formData={this.state.formData} mode={this.state.mode}
          onDismiss={this.handleDialogDismiss} onSave={this.handleSave} />

        <div className="fab">
          <Zoom in={true} unmountOnExit={true} style={{ transitionDelay: '1s' }} >
            <Tooltip title={CRUDModes.Create}>
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
                        <Tooltip title={CRUDModes.Update}>
                          <IconButton onClick={this.handleDialogOpen.bind(this, { mode: CRUDModes.Update, id: row._id, rowData: row })}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={CRUDModes.Delete}>
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