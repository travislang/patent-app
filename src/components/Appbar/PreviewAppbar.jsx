import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        // zIndex: theme.zIndex.drawer + 1,
        ...theme.mixins.toolbar
    },

});

function PreviewAppBar(props) {
    const { classes } = props;

    return (
        <AppBar position='absolute' color="default" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" color="inherit" >
                    Application #285509
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(PreviewAppBar);