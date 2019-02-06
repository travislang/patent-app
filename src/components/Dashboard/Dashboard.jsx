import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',

    },
    toolbar: {
        ...theme.mixins.toolbar
    },
    paper: {
        width: 500,
        height: 500
    }
})


class Dashboard extends Component {
    

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.toolbar}></div>
                <div className={classes.toolbar}></div>
                <Paper className={classes.paper}>

                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));