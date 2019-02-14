import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid'
import AlertDialog from '../AlertDialog/AlertDialog';


const styles = theme => ({
    dialogContainer: {
        minWidth: 700
    },
    appNumTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,

        cssLabel: {
            '&$cssFocused': {
                color: 'red',
            },
        }
    },
    searchAppNum: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputFieldsContainer: {
        margin: theme.spacing.unit * 3
    },
    cssFocused: {},
});

// Main Component being exported
class NewUserDialog extends React.Component {

    state = {
        userName: '',
        signatureName: '',
        phoneNumber: '',
        firmName: '',
        registrationNumber: '',
        usptoCustomerNumber: '',
        depositAccountNumber: '',
        password: '',
        retypedPassword: '',
        isError: false,
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleRegisterClick = () => {

        // Verify all fields not empty
        for (let key in this.state) {
            if (this.state[key] === '') {
                this.setState({
                    isError: true,
                });
                return; // take out
            }
        }
        // Verify User does not already exist


        // Verify Phone number


        // Verify passwords
        if (this.state.retypedPassword !== this.state.password) {
            return; // doesn't allow user to be created if password dont match
        }
        // Destructure state into payload as requested by route
        const {
            userName,
            signatureName,
            phoneNumber,
            firmName,
            registrationNumber,
            usptoCustomerNumber,
            depositAccountNumber,
            password
        } = this.state;

        // Dispatch action to register saga
        this.props.dispatch({
            type: 'REGISTER_USER', payload: {
                user_name: userName,
                signature_name: signatureName,
                phone_number: phoneNumber,
                firm_name: firmName,
                registration_number: registrationNumber,
                uspto_customer_number: usptoCustomerNumber,
                deposit_account_number: depositAccountNumber,
                password: password
            }
        })
        // Update Users List
        this.props.dispatch({ type: 'FETCH_USERS' })
        this.handleClickOpen();
    }

    passwordsDoMatch = () => {
        // Fields filled
        if (this.state.password !== '' && this.state.retypedPassword !== '') {
            // Fields match
            if (this.state.password == this.state.retypedPassword) {
                return false
            } else {
                return true;
            }

        } else {
            return false;
        }
    }

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
                <DialogTitle align='center' id="form-dialog-title"> New User
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item className={classes.inputFieldsContainer}>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <Grid container direction='column'>

                                        <TextField
                                            autoComplete={'off'}
                                            error={!this.state.userName && this.state.isError ? true : false}
                                            id="outlined-userName"
                                            label="User name"
                                            className={classes.appNumTextField}
                                            value={this.state.userName.text}
                                            onChange={(e) => {
                                                this.setState({ userName: e.target.value })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={!this.state.signatureName && this.state.isError ? true : false}
                                            id="outlined-signName"
                                            label="Signature name"
                                            className={classes.appNumTextField}
                                            value={this.state.signatureName.text}
                                            onChange={(e) => {
                                                this.setState({ signatureName: e.target.value })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={!this.state.phoneNumber && this.state.isError ? true : false}
                                            id="outlined-phone"
                                            label="Phone"
                                            className={classes.appNumTextField}
                                            value={this.state.phoneNumber.text}
                                            onChange={(e) => {
                                                this.setState({ phoneNumber: e.target.value })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={!this.state.firmName && this.state.isError ? true : false}
                                            id="outlined-firm"
                                            label="Firm"
                                            className={classes.appNumTextField}
                                            value={this.state.firmName.text}
                                            onChange={(e) => {
                                                this.setState({ firmName: e.target.value })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column'>

                                        <TextField
                                            autoComplete={'off'}
                                            error={!this.state.registrationNumber && this.state.isError ? true : false}
                                            id="outlined-regNum"
                                            label="Registration number"
                                            className={classes.appNumTextField}
                                            value={this.state.registrationNumber.text}
                                            onChange={(e) => {
                                                this.setState({ registrationNumber: e.target.value })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={!this.state.usptoCustomerNumber && this.state.isError ? true : false}
                                            id="outlined-usptoCustomerNum"
                                            label="USPTO Customer number"
                                            className={classes.appNumTextField}
                                            value={this.state.usptoCustomerNumber.text}
                                            onChange={(e) => {
                                                this.setState({ usptoCustomerNumber: e.target.value })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={!this.state.depositAccountNumber && this.state.isError ? true : false}
                                            id="outlined-depositAccount"
                                            label="Deposit account number"
                                            className={classes.appNumTextField}
                                            value={this.state.depositAccountNumber.text}
                                            onChange={(e) => {
                                                this.setState({ depositAccountNumber: e.target.value })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column'>

                                        <TextField
                                            autoComplete={'off'}
                                            error={!this.state.password && this.state.isError ? true : false}
                                            id="outlined-password"
                                            label="Desired password"
                                            type="password"
                                            className={classes.appNumTextField}
                                            value={this.state.password.text}
                                            onChange={(e) => {
                                                this.setState({ password: e.target.value })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                        <TextField
                                            autoComplete={'off'}
                                            error={this.passwordsDoMatch()}
                                            id="outlined-passwordCheck"
                                            label="Re-type password"
                                            type="password"
                                            required
                                            className={classes.appNumTextField}
                                            value={this.state.retypedPassword.text}
                                            onChange={(e) => {
                                                this.setState({ retypedPassword: e.target.value })
                                            }}
                                            variant="outlined"
                                            margin='dense'
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            this.props.handleClose();

                            // Revert state
                            for (let key in this.state) {
                                this.setState({
                                    [key]: ''
                                })
                            }
                            this.setState({
                                isError: false,
                                open: false,
                            })
                        }}
                        variant='contained'
                        color="default">
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={this.handleRegisterClick}
                    >
                        Register
                    </Button>
                </DialogActions>
                <AlertDialog
                    open={this.state.open}
                    handleClose={this.handleClose}
                    item={this.state.userName}
                    title="User Added"
                    followUpClose={()=>{this.props.handleClose()}}
                />
            </Dialog>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(NewUserDialog));