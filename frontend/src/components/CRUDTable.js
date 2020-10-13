import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Fab, Zoom, IconButton, Tooltip,
  Dialog, DialogActions, DialogTitle, DialogContent, Button, DialogContentText, Box, TextField
} from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import FormDialog from './FormDialog'
import { CRUDModes, DynamicForm } from '../SharedConstants'
import { File } from 'react-kawaii'

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
      id: null,
      name: null,
      deleteDisable: true
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
        this.setState({ openConfirmDelete: true, deleteDisable: true, id: param.id, name: param.name })
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
    this.props.onDelete(this.state.id)
    this.handleDialogDismiss()
  }
  handleConfirmDelete = (e) => {
    if (e.target.value === this.state.name)
      this.setState({ deleteDisable: false })
    else
      this.setState({ deleteDisable: true })
  }
  handleSave = (formData) => {
    switch (this.state.mode) {
      case CRUDModes.Create:
        this.props.onCreate(formData)
        break
      case CRUDModes.Update:
        this.props.onUpdate(this.state.id, formData)
        break
      default:
        console.log('Error in CRUDTable')
    }
    this.handleDialogDismiss()
  }
  renderBody = () => {
    switch (this.props.rows.length) {
      case 0:
        return <Box p={3}>
          <Box justifyContent="center" display="flex">
            <File size={200} mood="ko" color="#83D1FB" />
          </Box>
          <Alert severity="info" variant="outlined">Nothing is there!</Alert>
        </Box>
      default:
        return <TablePagination
          count={this.props.rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
    }
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
            <TextField margin="dense" label={"Type " + this.state.name + " to confirm"} onChange={this.handleConfirmDelete}
              variant="outlined" autoComplete="off" fullWidth />
            <DialogActions>
              <Button onClick={this.handleDialogDismiss} color="primary">Cancel</Button>
              <Button onClick={this.handleDelete} disabled={this.state.deleteDisable} color="secondary" variant="contained" disableElevation autoFocus>Delete</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <FormDialog trigger={this.state.openCEDialog} formFields={this.props.columns} formData={this.state.formData} mode={this.state.mode}
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
                  {this.props.columns.map((column) => (
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
                          <IconButton onClick={this.handleDialogOpen.bind(this, { mode: CRUDModes.Delete, id: row._id, name: (row._id).slice(-4) })}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      {this.props.columns.map((column) => {
                        let cellVal = row[column.id]
                        if (column.objectType === DynamicForm.DateField) {
                          cellVal = new Date(row[column.id]).toLocaleDateString('en-GB', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })
                        }
                        return <TableCell>{cellVal}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {this.renderBody()}
        </Paper>
      </React.Fragment >
    );
  }
}