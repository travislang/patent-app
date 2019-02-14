import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// support Component
class AlertDialog extends React.Component {
    render() {
        return (<Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="alert-dialog-notification">
            <DialogTitle id="alert-dialog-title" align="center">{this.props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {this.props.item} have been successfully added!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{this.props.handleClose();this.props.followUpClose()}} color="primary" autoFocus align="center">
                    Ok
              </Button>
            </DialogActions>
        </Dialog>);
    }
}

export default AlertDialog
