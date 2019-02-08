import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


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
        marginRight: theme.spacing.unit * 3,
        textDecoration: 'none',
        '&:hover': {
            color: 'blue'
          }
    }
    
});

function MainAppBar(props) {
    const { classes } = props;

    const handleLogout = () => {
        props.dispatch({
            type: 'LOGOUT'
        })
    }
    // cannot return nothing there for just returning <> </> as nothing
    return <>
    {/* check if there is a log in or not */}
    {props.state.user.id &&
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.logo} variant="h5" color="inherit" >
                        ResponseGen
                    </Typography>
                    <div className={classes.navContainer}>
                        <Typography className={classes.navItem} variant="button" color="inherit" component={Link} to="/dashboard">
                            Dashboard
                        </Typography>
                        <Typography className={classes.navItem} variant="button" color="inherit" component={Link} to="/template">
                            Templates
                        </Typography>
                        <Typography className={classes.navItem} variant="button" color="inherit" onClick={handleLogout}>
                            Logout
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
    }
            </>
}

const mapStateToProps = state => ({
    state,
  });

export default connect(mapStateToProps)(withStyles(styles)(MainAppBar));