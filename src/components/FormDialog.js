import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }
    from '@material-ui/core';

export default class FormDialog extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Dialog open={this.props.trigger}>
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.dialogHandler} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment >
        );
    }
}
