import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {TextEditor} from '../TextEditor/index';
import { Value } from 'slate';


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

const initialValue = (issue) => {
    if(issue.text){
        const parsed = JSON.parse(issue.text);
        return Value.fromJSON(parsed)
    }
}

const PreviewDoc = (props) => {
    const issues = props.issuesList;
    const oaId = props.oaId;
    return (
        issues.map(issue => {
            return issue.text ? 
            (
                <div id={issue.id} className={props.classes.root}>
                    <Paper className={props.classes.content}>
                        <TextEditor issue={issue} initialVal={initialValue(issue)} />
                    </Paper>
                </div>
            )
            :
            null
        })
    )
}
    
    

const mapStateToProps = state => ({
});

export default withStyles(styles)(PreviewDoc);