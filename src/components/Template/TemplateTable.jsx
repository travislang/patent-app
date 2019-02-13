import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        const { classes, users } = this.props;
        console.log(this.props);
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.head}>
                            <TableCell style={{ color: 'white' }}>Username</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Signature name</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Registration No.</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Phone</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Firm</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Customer No.</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Deposit No.</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow className={classes.row} key={user.id}>

                                <TableCell component="th" scope="row">
                                    {user.user_name}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {user.signature_name}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {user.registration_number}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {user.phone_number}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {user.firm_name}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {user.uspto_customer_number}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {user.deposit_account_number}
                                </TableCell>

                                <TableCell style={{ cursor: 'pointer' }} onClick={() => this.handleDeleteClick(user.id)} component="th" scope="row">
                                    {user.active ? 'yes' : 'no'}
                                </TableCell>

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
        users: store.userList,
        applicationList: store.application,
    }
)

export default connect(mapStoreToProps)(withStyles(styles)(TemplateTable));