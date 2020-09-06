import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle }
    from '@material-ui/core';
import { DynamicForm } from '../SharedConstants'

export default class FormDialog extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Dialog open={this.props.trigger} onClose={this.props.onDismiss}>
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogContent>
                        {
                            this.props.formFields.map((field) => {
                                switch (field.objectType) {
                                    case DynamicForm.TextField: return <TextField
                                        margin="dense"
                                        id={field.id}
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
                            <Button onClick={this.props.onSave} color="primary" variant="contained" disableElevation autoFocus>Save</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </React.Fragment >
        );
    }
}
