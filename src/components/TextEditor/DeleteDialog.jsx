import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteTemplateDialog extends React.Component {
    render() {
        const oaId = this.props;
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleTemplateDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Template?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will delete the entire selected template
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleTemplateDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.handleDeleteTemplate()} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeleteTemplateDialog;