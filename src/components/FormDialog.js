import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle }
    from '@material-ui/core';
import { DynamicForm } from '../SharedConstants'

export default class FormDialog extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        let fd = new FormData(e.target)
        let object = {}
        fd.forEach((value, key) => { object[key] = value });
        this.props.onSave(object)
    }
    render() {
        return (
            <React.Fragment>
                <Dialog open={this.props.trigger} onClose={this.props.onDismiss}>
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            {
                                this.props.formFields.map((field) => {
                                    switch (field.objectType) {
                                        case DynamicForm.TextField: return <TextField
                                            margin="dense"
                                            name={field.id}
                                            label={field.label}
                                            variant="outlined"
                                            autoComplete="off"
                                            fullWidth
                                        />
                                    }
                                })
                            }
                            <DialogActions>
                                <Button onClick={this.props.onDismiss} color="primary">Cancel</Button>
                                <Button type="submit" color="primary" variant="contained" disableElevation autoFocus>Save</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </React.Fragment >
        );
    }
}
