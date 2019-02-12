import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
    handleConfirm = () => {
        this.props.handleConfirm();
        this.props.handleClose();
    };
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Export without all sections addressed?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            There are some issues that you haven't entered responses for. You can see which ones
                            to the left. <br/>
                            A green checkmark shows that the response is entered.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.handleConfirm} color="primary" autoFocus>
                            Export
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;