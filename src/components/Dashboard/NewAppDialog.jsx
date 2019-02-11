import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

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
        appNum: '',
        search: false,
        setUser: '',
    };

    handleChange = name => event => { // handle change to the redux state
        this.props.dispatch({
            type: 'SET_USPTO_APP_DATA',
            payload: { ...this.props.reduxState.uspto, [name]: event.target.value }
        });
    };
    handleId = (event) => { //handle change to the application number
        this.setState({
            appNum: event.target.value
        });
    }
    handleAppSearch = () => { // handle which application to search for in uspto
        this.handleClear();
        this.props.dispatch({
            type: 'FETCH_USPTO_APP_DATA',
            payload: this.state.appNum
        });
        setTimeout(() => {
            if (this.props.reduxState.uspto !== false) {
                this.setState({
                    search: true,
                });
            }
        }, 800);
    }
    handleAdd = (applicationPayload) => { // handle adding new application
        this.props.dispatch({
            type: 'POST_APPLICATION',
            payload: applicationPayload
        });
        this.handleCloseDialog();
    }
    handleCloseDialog = () => { // clear dialog state
        this.props.handleClose();
        this.setState({
            appNum: '',
        })
        this.handleClear()
    }
    handleClear = () => { // clear dialog info
        this.setState({
            search: false,
        });
        this.props.dispatch({
            type: 'CLEAR_USPTO_APP_DATA'
        });
    }
    handleUserId = (event) => {
        this.setState({
            setUser: event.target.value
        })
    }
    render() {
        const { classes } = this.props;

        let applicationPayload = {
            user_id: this.state.setUser || this.props.reduxState.user.id, // admin set user or else use users id that is log in
            applicant_name: this.props.reduxState.uspto.applicantName,
            filed_date: this.props.reduxState.uspto.appFilingDate,
            last_checked_date: this.props.reduxState.uspto.LAST_MOD_TS,
            status_date: new Date().toLocaleDateString(), // grabbing today day and format it into '8/3/2018'
            application_number: this.state.appNum,
            title: this.props.reduxState.uspto.patentTitle,
            inventor_name: this.props.reduxState.uspto.inventorName,
            examiner_name: this.props.reduxState.uspto.appExamName,
            group_art_unit: this.props.reduxState.uspto.appGrpArtNumber,
            docket_number: this.props.reduxState.uspto.appAttrDockNumber,
            confirmation_number: this.props.reduxState.uspto.appConfrNumber
        }

        return (
            <Dialog
                maxWidth='lg'
                open={this.props.open}
                className={classes.dialogContainer}
                onClose={this.handleCloseDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle align='center' id="form-dialog-title">New        Application
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='column' alignItems='center'>
                        {this.props.reduxState.user.is_admin ?
                            // admin view
                            <Grid item>
                                <Typography variant='caption' color='textSecondary' align='center'>
                                    Search application to have patent fields auto-populated or enter them manually
                            </Typography>
                                <div className={classes.searchAppNum}>
                                    <TextField
                                        select
                                        label="With Select"
                                        className={classes.appNumTextField}
                                        value={this.state.setUser}
                                        onChange={this.handleUserId}
                                        margin="normal"
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        {this.props.reduxState.userList.map(user =>(
                                            <MenuItem key={user.id} value={user.id}>
                                            {user.user_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        error={this.props.reduxState.uspto === false}
                                        id="outlined-name"
                                        label={this.props.reduxState.uspto === false ? "Invalid Application Number" : "Application Number"}
                                        className={classes.appNumTextField}
                                        value={this.state.appNum || ''}
                                        onChange={this.handleId}
                                        margin="normal"
                                        variant="outlined"
                                        margin='dense'
                                    />
                                    <div>
                                        <Button
                                            type="submit"
                                            onClick={this.handleAppSearch} color="primary"
                                            variant='contained'
                                            size='large'>
                                            Search
                                    </Button>
                                    </div>
                                </div>
                            </Grid>
                            :
                            // regular user view
                            <Grid item>
                                <Typography variant='caption' color='textSecondary' align='center'>
                                    Search application to have patent fields auto-populated or enter them manually
                            </Typography>
                                <div className={classes.searchAppNum}>
                                    <TextField
                                        error={this.props.reduxState.uspto === false}
                                        id="outlined-name"
                                        label={this.props.reduxState.uspto === false ? "Invalid Application Number" : "Application Number"}
                                        className={classes.appNumTextField}
                                        value={this.state.appNum || ''}
                                        onChange={this.handleId}
                                        margin="normal"
                                        variant="outlined"
                                        margin='dense'
                                    />
                                    <div>
                                        <Button
                                            type="submit"
                                            onClick={this.handleAppSearch} color="primary"
                                            variant='contained'
                                            size='large'>
                                            Search
                                    </Button>
                                    </div>
                                </div>
                            </Grid>
                        }
                        <Grid item className={classes.inputFieldsContainer}>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            error={!this.props.reduxState.uspto.applicantName && this.state.search ? true : false}
                                            id="outlined-applicantName"
                                            label="Applicant Name"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.applicantName || ''}
                                            onChange={this.handleChange('applicantName')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.applicantName && {
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            error={!this.props.reduxState.uspto.LAST_MOD_TS && this.state.search ? true : false}
                                            id="outlined-lastDateCheck"
                                            label="Last Checked Date"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.LAST_MOD_TS || ''}
                                            onChange={this.handleChange('LAST_MOD_TS')}
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
                                            error={!this.props.reduxState.uspto.inventorName && this.state.search ? true : false}
                                            id="outlined-inventorName"
                                            label="Inventor Name"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.inventorName || ''}
                                            onChange={this.handleChange('inventorName')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.inventorName && {
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            error={!this.props.reduxState.uspto.appFilingDate && this.state.search ? true : false}
                                            id="outlined-filed"
                                            label="Date Filed"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appFilingDate || ''}
                                            onChange={this.handleChange('appFilingDate')}
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
                                            error={!this.props.reduxState.uspto.patentTitle && this.state.search ? true : false}
                                            id="outlined-title"
                                            label="Title"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.patentTitle || ''}
                                            onChange={this.handleChange('patentTitle')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.patentTitle && {
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            error={!this.props.reduxState.uspto.appExamName && this.state.search ? true : false}
                                            id="outlined-examiner"
                                            label="Examiner"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appExamName || ''}
                                            onChange={this.handleChange('appExamName')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.appExamName && {
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            error={!this.props.reduxState.uspto.appGrpArtNumber && this.state.search ? true : false}
                                            id="outlined-groupArtNum"
                                            label="Group Art Number"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appGrpArtNumber || ''}
                                            onChange={this.handleChange('appGrpArtNumber')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.appGrpArtNumber && {
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            error={!this.props.reduxState.uspto.appAttrDockNumber && this.state.search ? true : false}
                                            id="outlined-docketNum"
                                            label="Docket Number"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appAttrDockNumber || ''}
                                            onChange={this.handleChange('appAttrDockNumber')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.appAttrDockNumber && {
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            error={!this.props.reduxState.uspto.appConfrNumber && this.state.search ? true : false}
                                            id="outlined-confNum"
                                            label="Confirmation Number"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appConfrNumber || ''}
                                            onChange={this.handleChange('appConfrNumber')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.appConfrNumber && {
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
                    <Button onClick={this.handleCloseDialog} variant='contained' color="default">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.handleAdd(applicationPayload)}
                        variant='contained'
                        color="primary"
                        disabled={
                            // enable button once text field is filled out
                            this.props.reduxState.uspto.applicantName
                                && this.props.reduxState.uspto.appFilingDate
                                && this.props.reduxState.uspto.LAST_MOD_TS
                                && this.state.appNum
                                && this.props.reduxState.uspto.patentTitle
                                && this.props.reduxState.uspto.inventorName
                                && this.props.reduxState.uspto.appExamName
                                && this.props.reduxState.uspto.appGrpArtNumber
                                && this.props.reduxState.uspto.appAttrDockNumber
                                && this.props.reduxState.uspto.appConfrNumber
                                ? false : true
                        }
                    >
                        Add Application
                    </Button>
                </DialogActions>
            </Dialog >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(NewAppDialog));