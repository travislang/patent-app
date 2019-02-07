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
        this.setState({
            [name]: event.target.value,
        });
    };

    handleAppSearch = () => {
        this.props.dispatch({
            type: 'FETCH_USPTO_APP_DATA',
            payload: this.state.appNum
          });

        setTimeout(this.handleSetStateFromSearch, 2000)
    }

    handleSetStateFromSearch = () => {
        this.setState({
            firstNamedInv: this.props.reduxState.uspto.inventorName,
            filed: this.props.reduxState.uspto.appFilingDate,
            title: this.props.reduxState.uspto.patentTitle,
            examiner: this.props.reduxState.uspto.appExamName,
            groupArtNum: this.props.reduxState.uspto.appGrpArtNumber,
            docketNum: this.props.reduxState.uspto.appAttrDockNumber,
            confNum: this.props.reduxState.uspto.appConfrNumber,
        })
    }   

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
                                    onChange={this.handleChange('appNum')}
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
                                            id="outlined-firstName"
                                            label="First Named Inv."
                                            className={classes.appNumTextField}
                                            value={this.state.firstNamedInv}
                                            onChange={this.handleChange('firstNamedInv')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                        <TextField
                                            id="outlined-serialNum"
                                            label="Serial Number"
                                            className={classes.appNumTextField}
                                            value={this.state.serialNum}
                                            onChange={this.handleChange('serialNum')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                        <TextField
                                            id="outlined-filed"
                                            label="Filed"
                                            className={classes.appNumTextField}
                                            value={this.state.filed}
                                            onChange={this.handleChange('filed')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                        
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            id="outlined-customerNumb"
                                            label="Customer Number"
                                            className={classes.appNumTextField}
                                            value={this.state.customerNum}
                                            onChange={this.handleChange('customerNum')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                        <TextField
                                            id="outlined-title"
                                            label="Title"
                                            className={classes.appNumTextField}
                                            value={this.state.title}
                                            onChange={this.handleChange('title')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                        <TextField
                                            id="outlined-examiner"
                                            label="Examiner"
                                            className={classes.appNumTextField}
                                            value={this.state.examiner}
                                            onChange={this.handleChange('examiner')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            id="outlined-groupArtNum"
                                            label="Group Art Number"
                                            className={classes.appNumTextField}
                                            value={this.state.groupArtNum}
                                            onChange={this.handleChange('groupArtNum')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                        <TextField
                                            id="outlined-docketNum"
                                            label="Docket Number"
                                            className={classes.appNumTextField}
                                            value={this.state.docketNum}
                                            onChange={this.handleChange('docketNum')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                        />
                                        <TextField
                                            id="outlined-confNum"
                                            label="Conference Number"
                                            className={classes.appNumTextField}
                                            value={this.state.confNum}
                                            onChange={this.handleChange('confNum')}
                                            margin="normal"
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
                    <Button onClick={this.props.handleClose} variant='contained' color="default">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} variant='contained' color="primary">
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