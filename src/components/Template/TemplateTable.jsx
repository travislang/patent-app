import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: `#efefef`,
        },
    },
    head: {
        backgroundColor: '#1796f0'
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class TemplateTable extends Component {
    handleDeleteClick = (id) => {
        this.props.dispatch({
            type: 'UPDATE_USER_ACTIVITY',
            payload: { id }
        })
    };
    render() {
        const { classes, allTemplates, user } = this.props;
        console.log('props', this.props);
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.head}>
                            <TableCell style={{ color: 'white' }}>Type</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Template name</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">User</TableCell>
                            {user.is_admin && <TableCell style={{ color: 'white' }} align="center">Delete</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allTemplates && allTemplates.map(template => (
                            <TableRow className={classes.row} key={template.id}>
                                <TableCell component="th" scope="row">
                                    {template.type}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {template.template_name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {template.user_id ? template.user_name : 'All'}
                                </TableCell>
                                {user.is_admin && <TableCell component="th" scope="row">
                                    <IconButton>
                                        <DeleteIcon fontSize={'small'}/>
                                    </IconButton>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const mapStoreToProps = store => (
    {
        allTemplates: store.template.allTemplates,
        applicationList: store.application,
        user : store.user,
    }
)

export default connect(mapStoreToProps)(withStyles(styles)(TemplateTable));