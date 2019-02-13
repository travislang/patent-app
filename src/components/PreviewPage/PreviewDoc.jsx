import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {TextEditor} from '../TextEditor/index';
import { Value } from 'slate';

import Plain from 'slate-plain-serializer';

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
    defaultContent: {
        flexGrow: 1,
        margin: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 3,
        width: '8in'
    },
    defaultText: {
        paddingBottom: theme.spacing.unit
    }
});

const initialValue = (issue) => {
    if(issue.text) {
        return Plain.deserialize(issue.text)
    }
}

const PreviewDoc = (props) => {
    const {classes} = props;
    const responseList = props.responseList;
    const issues = props.issuesList;
    const oaId = props.oaId;
    if (responseList.length > 0) {
        return (
            issues.map(issue => {
                return issue.text ?
                    (
                        <div key={issue.id} id={Number(issue.id)} className={classes.root}>
                            <Paper className={classes.content}>
                                <TextEditor issue={issue} initialVal={initialValue(issue)} />
                            </Paper>
                        </div>
                    )
                    :
                    null
            })
        )
    } else {
        return (
            <div className={classes.root}>
                <Paper className={classes.defaultContent}>
                    <Typography variant='h4' align='center' gutterBottom>
                        This is your Document Preview.
                    </Typography>
                    <Typography className={classes.defaultText} variant='body1' gutterBottom>
                        On the left side there is a drawer where all of the addressable items will be.  If the text is grey it means that item has not been addressed yet. If the item has been addressed it will be green with a checkmark next to it.
                    </Typography>
                    <Typography className={classes.defaultText} variant='body1' gutterBottom>
                        To add additional items to the list click on 'Add Item'.  
                    </Typography>
                    <Typography className={classes.defaultText} variant='body1' gutterBottom>
                        Click on an item on the left to choose an editable template and get started.  
                    </Typography>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    responseList: state.application.currentOfficeActionResponseTextList
});

export default connect(mapStateToProps)(withStyles(styles)(PreviewDoc));