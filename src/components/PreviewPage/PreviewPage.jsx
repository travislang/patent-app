import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import AppDrawer from '../Appbar/AppDrawer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
    },
});

const PreviewPage = (props) => (
    <div className={props.classes.root}>
        <AppDrawer />
    </div>
);


export default withStyles(styles)(PreviewPage);