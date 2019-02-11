import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, withStyles } from '@material-ui/core';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    dialogContainer: {
        minWidth: 700
    },
    appNumTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    searchAppNum: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputFieldsContainer: {
        margin: theme.spacing.unit * 3
    }
});


class NewAppDialog extends React.Component {
    state = {
        uspto_mailing_date: '',
        response_sent_date: '',
        uspto_status: '',
        status_id: null,
    };
    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };
    handleAdd = () => {
        console.log('in handle add')
        this.props.dispatch({
            type: 'POST_OFFICE_ACTION',
            payload: this.state,
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <Dialog
                maxWidth='lg'
                open={this.props.open}
                className={classes.dialogContainer}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle align='center' id="form-dialog-title">New Office Action
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item className={classes.inputFieldsContainer}>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            id="outlined-usptoMailingDate"
                                            label="USPTO Mailing Date"
                                            className={classes.appNumTextField}
                                            value={this.state.uspto_mailing_date}
                                            // type='date'
                                            onChange={this.handleChange('uspto_mailing_date')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.state.uspto_mailing_date && {
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="outlined-responseSentDate"
                                            label="Response Sent Date"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.LAST_MOD_TS}
                                            onChange={this.handleChange('response_sent_date')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.state.response_sent_date && {
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            id="outlined-usptoStatus"
                                            label="USPTO Status"
                                            className={classes.appNumTextField}
                                            value={this.state.uspto_status}
                                            onChange={this.handleChange('uspto_status')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.state.uspto_status && {
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} variant='contained' color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => this.handleAdd(this.state)} variant='contained' color="primary">
                        Add Office Action
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(NewAppDialog));