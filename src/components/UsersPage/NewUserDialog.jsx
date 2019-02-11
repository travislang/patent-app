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


class NewUserDialog extends React.Component {
    state = {
        userName: '',
        signatureName: '',
        registrationNumber: '',
        phoneNumber: '',
        firmName: '',
        usptoCustomerNumber: '',
        depositAccountNumber: '',
        password: '',
        retypedPassword: ''
    };

    render() {
        const { classes } = this.props;

        //   "user_name" VARCHAR (20) UNIQUE NOT NULL,
        //   "password" VARCHAR (255) NOT NULL,
        //   "is_admin" BOOLEAN DEFAULT FALSE,
        //   "signature_name" VARCHAR(70),
        //   "registration_number" VARCHAR(10),
        //   "phone_number" VARCHAR(20),
        //   "firm_name" VARCHAR(70),
        //   "uspto_customer_number" VARCHAR(9),
        //   "deposit_account_number" VARCHAR(9),
        //   "active" BOOLEAN DEFAULT TRUE

        return (
            <Dialog
                maxWidth='lg'
                open={this.props.open}
                className={classes.dialogContainer}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle align='center' id="form-dialog-title">New User
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item className={classes.inputFieldsContainer}>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <Grid container direction='column'>

                                        <TextField
                                            id="outlined-applicantName"
                                            label="User name"
                                            className={classes.appNumTextField}
                                            value={this.state.userName}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.applicantName && {
                                                shrink: true,
                                            }}
                                        />

                                        <TextField
                                            id="outlined-lastDateCheck"
                                            label="Signature name"
                                            className={classes.appNumTextField}
                                            value={this.state.signatureName}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.LAST_MOD_TS && {
                                                shrink: true,
                                            }}
                                        />

                                        <TextField
                                            id="outlined-lastDateCheck"
                                            label="Phone"
                                            className={classes.appNumTextField}
                                            value={this.state.phoneNumber}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.LAST_MOD_TS && {
                                                shrink: true,
                                            }}
                                        />

                                        <TextField
                                            id="outlined-lastDateCheck"
                                            label="Firm"
                                            className={classes.appNumTextField}
                                            value={this.state.firmName}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.LAST_MOD_TS && {
                                                shrink: true,
                                            }}
                                        />

                                        <TextField
                                            id="outlined-lastDateCheck"
                                            label="USPTO Customer number"
                                            className={classes.appNumTextField}
                                            value={this.state.usptoCustomerNumber}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.LAST_MOD_TS && {
                                                shrink: true,
                                            }}
                                        />

                                        <TextField
                                            id="outlined-lastDateCheck"
                                            label="Deposit account number:"
                                            className={classes.appNumTextField}
                                            value={this.state.usptoCustomerNumber}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.LAST_MOD_TS && {
                                                shrink: true,
                                            }}
                                        />

                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            id="outlined-inventorName"
                                            label="Inventor Name"
                                            className={classes.appNumTextField}
                                            value={5}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.inventorName && {
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="outlined-filed"
                                            label="Date Filed"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appFilingDate}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.appFilingDate && {
                                                shrink: true,
                                            }}
                                        />

                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            id="outlined-customerNumb"
                                            label="Customer Number"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.customerNum}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.customerNum && {
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="outlined-title"
                                            label="Title"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.patentTitle}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.patentTitle && {
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="outlined-examiner"
                                            label="Examiner"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appExamName}
                                            onChange={(e) => { }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.appExamName && {
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
                    <Button variant='contained' color="primary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(NewUserDialog));