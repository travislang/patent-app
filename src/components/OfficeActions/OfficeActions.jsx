import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import OfficeActionTable from './OfficeActionTable';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',

    },
    paper: {
        margin: theme.spacing.unit * 15,
        minWidth: 1040,
    },
    title: {
        padding: `${theme.spacing.unit * 2}px 0 0`
    },
    button: {
        margin: theme.spacing.unit,
    },
    titleInfo: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`
    },
    fullWidth: {
        width: '100%',
    },
    addNew: {
        margin: theme.spacing.unit * 3,
        minHeight: '100%',
    },
    formControl: {
        margin: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    infoHeading: {
        paddingLeft: theme.spacing.unit * 2,
        fontWeight: 300
    }
})


class OfficeActions extends Component {
    state = {
        dialogOpen: false,
        displayAllApps: 'false',
    };

    handleChange = event => {
        this.setState({ displayAllApps: event.target.value });
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleNewApp = () => {
        this.setState({ dialogOpen: true })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container justify='center'>
                        <Grid item className={classes.title}>
                            <Typography color='primary' variant='h4' align='center'>
                                Application Number 2
                            </Typography>
                        </Grid>
                        <Grid item className={classes.fullWidth}>
                            <Grid container justify='space-between' item className={classes.titleInfo}>
                                <Grid item className={classes.infoLeft}>
                                    <Grid container direction='column'>
                                        <Typography gutterBottom color='textPrimary' variant='h6'>
                                            First Named Inv: 
                                            <span className={classes.infoHeading}>
                                                test
                                            </span>
                                        </Typography>
                                        <Typography gutterBottom color='textPrimary' variant='h6'>
                                            Serial Number: 
                                            <span className={classes.infoHeading}>
                                                test
                                            </span>
                                        </Typography>
                                        <Typography gutterBottom color='textPrimary' variant='h6'>
                                            Filed: 
                                            <span className={classes.infoHeading}>
                                                test
                                            </span>
                                        </Typography>
                                        <Typography gutterBottom color='textPrimary' variant='h6'>
                                            Customer Number: 
                                            <span className={classes.infoHeading}>
                                                test
                                            </span>
                                        </Typography>
                                        <Typography gutterBottom color='textPrimary' variant='h6'>
                                            Title:
                                            <span className={classes.infoHeading}>
                                                test
                                            </span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.infoRight}>
                                    <Grid container direction='column'>
                                        <Typography gutterBottom color='textPrimary' variant='h6'>
                                            Examiner:
                                            <span className={classes.infoHeading}>
                                                test
                                            </span>
                                        </Typography>
                                        <Typography gutterBottom color='textPrimary' variant='h6'>
                                            Group Art Unit: 
                                            <span className={classes.infoHeading}>
                                                test
                                            </span>
                                        </Typography>
                                        <Typography gutterBottom color='textPrimary' variant='h6'>
                                            Docket Number: 
                                            <span className={classes.infoHeading}>
                                                test
                                            </span>
                                        </Typography>
                                        <Typography gutterBottom color='textPrimary' variant='h6'>
                                            Conference Number:
                                            <span className={classes.infoHeading}>
                                                test
                                            </span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container style={{padding: 16}} justify='space-between'>
                        <Grid item>
                            <Typography variant='h6' color='textPrimary'>
                                Action Responses
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button color='primary' variant='contained'>
                                New Response
                            </Button>
                        </Grid>
                    </Grid>
                    <OfficeActionTable />
                    {/* <NewAppDialog open={this.state.dialogOpen} handleClose={this.handleClose} /> */}
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(withStyles(styles)(OfficeActions));