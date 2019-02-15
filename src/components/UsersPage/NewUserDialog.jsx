import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';

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
    styledHeader: {
        backgroundColor: '#1796f0',
        '& h2': {
          color: 'white',
        }
    }
});


class NewUserDialog extends React.Component {

    state = {
        userName: { text: '', error: false },
        signatureName: { text: '', error: false },
        phoneNumber: { text: '', error: false },
        firmName: { text: '', error: false },

        registrationNumber: { text: '', error: false },
        usptoCustomerNumber: { text: '', error: false },
        depositAccountNumber: { text: '', error: false },

        password: { text: '', error: false },
        retypedPassword: { text: '', error: false },
    };

    handleRegisterClick = () => {

        // Verify all fields not empty
        for (let key in this.state) {
            if (this.state[key].text == '') {

                // Synchonously update state and force rerender
                // setState wasn't being called in time for this.fieldsVerified()
                this.state[key].error = true;
                this.forceUpdate();
            }
        }

        // Verify User does not already exist


        // Verify Phone number


        // Verify passwords
        if (!this.passwordsDoMatch()) {
            console.log('Passwords do not match!');
            this.setState({
                retypedPassword: { text: '', error: true }
            })
            return;
        }

        if (this.fieldsVerified()) {
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
                    user_name: userName.text,
                    signature_name: signatureName.text,
                    phone_number: phoneNumber.text,
                    firm_name: firmName.text,
                    registration_number: registrationNumber.text,
                    uspto_customer_number: usptoCustomerNumber.text,
                    deposit_account_number: depositAccountNumber.text,
                    password: password.text
                }
            })
        }
    }

    fieldsVerified = () => {
        for (let key in this.state) {
            if (this.state[key].error) {
                return false
            }
        }

        return true;
    }

    passwordsDoMatch = () => {
        // Fields filled
        if (this.state.password.text != '' && this.state.retypedPassword.text != '') {
            // Fields match
            if (this.state.password.text == this.state.retypedPassword.text) {
                return true
            } else {
                return false;
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
            >
                <DialogTitle className={classes.styledHeader} align='center'> 
                    New User
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item className={classes.inputFieldsContainer}>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            autoComplete={'off'}
                                            error={this.state.userName.error}
                                            id="outlined-applicantName"
                                            label="User name"
                                            className={classes.appNumTextField}
                                            value={this.state.userName.text}
                                            onChange={(e) => {
                                                this.setState({ userName: { text: e.target.value, error: false } })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={this.state.signatureName.error}
                                            id="outlined-lastDateCheck"
                                            label="Signature name"
                                            className={classes.appNumTextField}
                                            value={this.state.signatureName.text}
                                            onChange={(e) => {
                                                this.setState({ signatureName: { text: e.target.value, error: false } })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={this.state.phoneNumber.error}
                                            id="outlined-lastDateCheck"
                                            label="Phone"
                                            className={classes.appNumTextField}
                                            value={this.state.phoneNumber.text}
                                            onChange={(e) => {
                                                this.setState({ phoneNumber: { text: e.target.value, error: false } })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={this.state.firmName.error}
                                            id="outlined-lastDateCheck"
                                            label="Firm"
                                            className={classes.appNumTextField}
                                            value={this.state.firmName.text}
                                            onChange={(e) => {
                                                this.setState({ firmName: { text: e.target.value, error: false } })
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
                                            error={this.state.registrationNumber.error}
                                            id="outlined-lastDateCheck"
                                            label="Registration number"
                                            className={classes.appNumTextField}
                                            value={this.state.registrationNumber.text}
                                            onChange={(e) => {
                                                this.setState({ registrationNumber: { text: e.target.value, error: false } })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={this.state.usptoCustomerNumber.error}
                                            id="outlined-lastDateCheck"
                                            label="USPTO Customer number"
                                            className={classes.appNumTextField}
                                            value={this.state.usptoCustomerNumber.text}
                                            onChange={(e) => {
                                                this.setState({ usptoCustomerNumber: { text: e.target.value, error: false } })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />

                                        <TextField
                                            autoComplete={'off'}
                                            error={this.state.depositAccountNumber.error}
                                            id="outlined-lastDateCheck"
                                            label="Deposit account number"
                                            className={classes.appNumTextField}
                                            value={this.state.depositAccountNumber.text}
                                            onChange={(e) => {
                                                this.setState({ depositAccountNumber: { text: e.target.value, error: false } })
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
                                            error={this.state.password.error}
                                            id="outlined-lastDateCheck"
                                            label="Desired password"
                                            type="password"
                                            className={classes.appNumTextField}
                                            value={this.state.password.text}
                                            onChange={(e) => {
                                                this.setState({ password: { text: e.target.value, error: false } })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                        <TextField
                                            autoComplete={'off'}
                                            error={this.state.retypedPassword.error}
                                            id="outlined-lastDateCheck"
                                            label="Re-type password"
                                            type="password"
                                            className={classes.appNumTextField}
                                            value={this.state.retypedPassword.text}
                                            onChange={(e) => {
                                                this.setState({ retypedPassword: { text: e.target.value, error: false } })
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
                                    [key]: { text: '', error: false }
                                })
                            }

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
            </Dialog>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(NewUserDialog));