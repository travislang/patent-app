import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import UsersTable from './UsersTable';
import NewUserDialog from './NewUserDialog';

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
        padding: `0 ${theme.spacing.unit * 3}px`
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
})


class UsersPage extends Component {

    state = {
        showUserRegistration: false
    }

    componentDidMount(){
        
        // Load users into state 
        this.props.dispatch({type: 'FETCH_USERS'})

    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleNewApp = () => {
        this.setState({ dialogOpen: true})
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container justify='center'>
                        <Grid item className={classes.title}>
                            <Typography color='primary' variant='h4' align='center'>
                                Users
                            </Typography>
                        </Grid>
                        <Grid className={classes.fullWidth}>
                            <Grid container justify='space-between' item className={classes.titleInfo}>
                                <Grid item className={classes.filter}>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <div className={classes.fullWidth}>
                                        </div>
                                    </FormControl>
                                </Grid>
                                <Grid item className={classes.addNew}>
                                    <Grid container style={{height: '100%'}} alignItems='center'>
                                        <Grid item>
                                            <Button 
                                                color='primary' variant="contained" 
                                                size='large'
                                                onClick={this.handleNewApp}
                                                className={classes.button}>
                                                Add User
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <UsersTable />
                    <NewUserDialog open={this.state.showUserRegistration} handleClose={this.handleClose} />
                </Paper>
            </div>
        )
    }
}

export default connect()(withStyles(styles)(UsersPage));