import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {TextEditor} from '../TextEditor/index';
import { Value } from 'slate';

import templateParser from '../../modules/template/replaceTemplateFields';

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

function getSlateHeading(issue) {
    if(issue.section === 'issues') {
        return `claims ${issue.claims} ${issue.type}`
    }
    else {
        return issue.type
    }
}

const initialValue = (issue) => {
    return Value.fromJSON({
            document: {
                nodes: [
                    {
                        object: 'block',
                        type: 'title',
                        nodes: [
                            {
                                object: 'text',
                                leaves: [
                                    {
                                        text: getSlateHeading(issue)
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        object: 'block',
                        type: 'paragragh',
                        nodes: [
                            {
                                object: 'text',
                                leaves: [
                                    {
                                        text: templateParser(issue.text, issue)
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        })
}

// claims: "1-5, 8"
// id: 9
// office_action_id: 1
// section: "issues"
// template_id: null
// template_type_id: 9
// text: null
// type: "Claim Rejection - Section 102"



const PreviewDoc = (props) => {
    const issues = props.issuesList;
    
    return (
        issues.map(issue => {
            return issue.text ? 
            (
                <div id={issue.id} className={props.classes.root}>
                    <Paper className={props.classes.content}>
                        <TextEditor initialVal={initialValue(issue)} />
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