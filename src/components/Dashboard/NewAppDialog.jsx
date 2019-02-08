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
        appNum: ''
    };

    handleChange = name => event => {
        this.props.dispatch({
            type: 'SET_USPTO_APP_DATA',
            payload: { ...this.props.reduxState.uspto, [name]: event.target.value }
          })
    };
    handleId = (event) => {
        this.setState({
            appNum: event.target.value
        })
    }
    handleAppSearch = () => {
        this.props.dispatch({
            type: 'FETCH_USPTO_APP_DATA',
            payload: this.state.appNum
          });
    }
    handleAdd = () => {
        this.props.dispatch({
            type: 'POST_APPLICATION',
            payload: {

            }
        });
        // this.handleClose
    }

    // const {
    //     user_id,
    //     applicant_name,
    //     status,
    //     last_checked_date,
    //     application_number,
    //     title,
    //     inventor_name
    // } = action.payload;

    /*
        user id
        applicant name
        date filed
        group art number
        docket number
        title
        examiner
        conformation number
        inventor name

        // application number // for user
        // status date // not when adding
        // last check data // not use for adding application
        // applicant name // user add or get from uspto

    */

    render() {
        const {classes} = this.props;
        return (
            <Dialog
                maxWidth='lg'
                open={this.props.open}
                className={classes.dialogContainer}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle align='center' id="form-dialog-title">New        Application
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item>
                            <Typography variant='caption' color='textSecondary' align='center'>
                                Search application to have patent fields auto-populated or enter them manually
                            </Typography>
                            <div className={classes.searchAppNum}>
                                <TextField
                                    id="outlined-name"
                                    label="Application Number"
                                    className={classes.appNumTextField}
                                    value={this.state.appNum}
                                    onChange={this.handleId}
                                    margin="normal"
                                    variant="outlined"
                                    margin='dense'
                                />
                                <div>
                                    <Button 
                                        onClick={this.handleAppSearch}        color="primary"
                                        variant='contained'
                                        size='large'>
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item className={classes.inputFieldsContainer}>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            id="outlined-inventorName"
                                            label="Inventor Name"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.inventorName}
                                            onChange={this.handleChange('inventorName')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.inventorName && {
                                                shrink: true,
                                              }}
                                        />
                                        <TextField
                                            id="outlined-serialNum"
                                            label="Serial Number"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appSerialNumber}
                                            onChange={this.handleChange('appSerialNumber')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.appSerialNumber && {
                                                shrink: true,
                                              }}
                                        />
                                        <TextField
                                            id="outlined-filed"
                                            label="Date Filed"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appFilingDate}
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
                                            id="outlined-customerNumb"
                                            label="Customer Number"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.customerNum}
                                            onChange={this.handleChange('customerNum')}
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
                                            onChange={this.handleChange('patentTitle')}
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
                                            id="outlined-groupArtNum"
                                            label="Group Art Number"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appGrpArtNumber}
                                            onChange={this.handleChange('appGrpArtNumber')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.appGrpArtNumber && {
                                                shrink: true,
                                              }}
                                        />
                                        <TextField
                                            id="outlined-docketNum"
                                            label="Docket Number"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appAttrDockNumber}
                                            onChange={this.handleChange('appAttrDockNumber')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.props.reduxState.uspto.appAttrDockNumber && {
                                                shrink: true,
                                              }}
                                        />
                                        <TextField
                                            id="outlined-confNum"
                                            label="Conformation Number"
                                            className={classes.appNumTextField}
                                            value={this.props.reduxState.uspto.appConfrNumber}
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
                    <Button onClick={this.props.handleClose} variant='contained' color="default">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAdd} variant='contained' color="primary">
                        Add Application
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