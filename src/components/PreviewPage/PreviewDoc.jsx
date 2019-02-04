import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {TextEditor} from '../TextEditor/index';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        flexGrow: 1,
        margin: theme.spacing.unit * 3,
        width: '8in'
    },

});



const PreviewDoc = (props) => (
    <div className={props.classes.root}>
        <Paper className={props.classes.content}>
            <TextEditor />
        </Paper>
        <Paper className={props.classes.content}>
            <TextEditor />
        </Paper>
    </div>
);


export default withStyles(styles)(PreviewDoc);