import React from 'react';
import AppDrawer from '../Appbar/AppDrawer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        
    },
    content: {
        flexGrow: 1,
        backgroundColor: 'red',
        padding: theme.spacing.unit * 3,
        minHeight: '70vw',
        border: '20px solid black'
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
});

const PreviewPage = (props) => (
    <div>
        <AppDrawer />
    </div>
);


export default withStyles(styles)(PreviewPage);