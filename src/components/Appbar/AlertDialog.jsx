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
        const oaId = this.props.oaId;
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
                            There {this.props.numIssues === 1 ? 'is 1 issue': `are ${this.props.numIssues} issues`} that you haven't entered a response for. 
                            <br/>A green checkmark on an issue to the left shows that a response is entered.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <a style={{
                            outline: 'none', textDecoration: 'none'}} href={`http://localhost:5000/api/download/${oaId}`}>
                            <Button onClick={this.handleConfirm} color="primary" autoFocus>
                                Export
                            </Button>
                        </a>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;