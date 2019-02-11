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
    return (
        <AppBar position="fixed" color="default" className={classes.appBar}>
            <Toolbar>
                <Typography className={classes.logo} variant="h5" color="inherit" >
                    ResponseGen
                    </Typography>
                    <div className={classes.navContainer}>
                        {props.state.user.is_admin &&
                        // show user option if admin
                        <>
                        <Typography className={classes.navItem} variant="button" color="inherit" component={Link} to="/users">
                            Users
                        </Typography>
                        </>
                        }
                        {props.state.user.id && 
                        // show other option when there is a user
                        <>
                        <Typography className={classes.navItem} variant="button" color="inherit" component={Link} to="/dashboard">
                            Dashboard
                        </Typography>
                        <Typography className={classes.navItem} variant="button" color="inherit" component={Link} to="/template">
                            Templates
                        </Typography>
                        </>
                        }
                        {props.state.user.id ?
                        // when user are logged in
                        <Typography className={classes.navItem} variant="button" color="inherit" onClick={handleLogout} component={Link} to="/">
                            Logout
                        </Typography>
                        :
                        // when no user are log in
                        <Typography className={classes.navItem} variant="button" color="inherit" component={Link} to="/home">
                            Login
                        </Typography>
                        }
                    </div>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(withStyles(styles)(MainAppBar));