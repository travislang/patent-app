import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
        flexGrow: 1
    },
    navContainer: {
        display: 'flex'
    },
    navItem: {
        marginRight: theme.spacing.unit * 3
    }
    
});

function MainAppBar(props) {
    const { classes } = props;

    return (
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.logo} variant="h5" color="inherit" >
                        ResponseGen
                    </Typography>
                    <div className={classes.navContainer}>
                        <Typography className={classes.navItem} variant="button" color="inherit" >
                            Dashboard
                        </Typography>
                        <Typography className={classes.navItem} variant="button" color="inherit" >
                            Templates
                        </Typography>
                        <Typography className={classes.navItem} variant="button" color="inherit" >
                            Logout
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
    );
}

export default withStyles(styles)(MainAppBar);