import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
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

    state = {
        page: 0,
        rowsPerPage: 10,
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleDeleteClick = (id) => {
        this.props.dispatch({
            type: 'UPDATE_USER_ACTIVITY',
            payload: { id }
        })
    };
    render() {
        const { classes, allTemplates, user } = this.props;
        const { rowsPerPage, page } = this.state;
        console.log('props', this.props);
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell align="left" style={{ color: 'white' }}>Type</TableCell>
                                <TableCell align="left" style={{ color: 'white' }} align="left">Template name</TableCell>
                                <TableCell align='center' style={{ color: 'white' }}>User</TableCell>
                                {user.is_admin && <TableCell style={{ color: 'white' }} align="center">Delete</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allTemplates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((template,i) => (
                                <TableRow key={i} className={classes.row}>
                                    <TableCell component="th" scope="row">
                                        {template.type}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {template.template_name}
                                    </TableCell>
                                    <TableCell align='center' component="th" scope="row">
                                        {template.user_id ? template.user_name : 'All'}
                                    </TableCell>
                                    {user.is_admin && <TableCell align='center' component="th" scope="row">
                                        <IconButton>
                                            <DeleteIcon fontSize={'small'} />
                                        </IconButton>
                                    </TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={allTemplates.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }
}

const mapStoreToProps = store => (
    {
        allTemplates: store.template.allTemplates,
        applicationList: store.application,
        user: store.user,
    }
)

export default connect(mapStoreToProps)(withStyles(styles)(TemplateTable));