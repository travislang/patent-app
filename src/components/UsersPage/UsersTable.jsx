import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: `#efefef`,
        },
    },
    head: {
        backgroundColor: '#267CCE'
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

class UsersTable extends Component {
    handleActiveClick = (id) => {
        this.props.dispatch({
            type: 'UPDATE_USER_ACTIVITY',
            payload: { id }
        })
    };
    handleAdminClick = (id) => {
        this.props.dispatch({
            type: 'UPDATE_USER_ADMIN',
            payload: { id }
        });
    };
    render() {
        const { classes, users } = this.props;
        console.log(this.props);
        return (
            <Paper className={classes.root} style={{ boxShadow: 'none' }}>
                <Table className={classes.table} style={{ boxShadow: 'none' }}>
                    <TableHead>
                        <TableRow className={classes.head} style={{ boxShadow: 'none' }}>
                            <TableCell style={{ color: 'white' }}>Username</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Signature name</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Registration No.</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Phone</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Firm</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Customer No.</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Deposit No.</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Active</TableCell>
                            <TableCell style={{ color: 'white' }} align="left">Admin</TableCell>
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
                                <TableCell align="center" style={{ cursor: 'pointer' }}  component="th" scope="row">
                                    <Checkbox 
                                        checked={user.active}
                                        value={user.active} 
                                        color="primary" 
                                        onClick={() => this.handleActiveClick(user.id)}
                                    />
                                </TableCell>
                                <TableCell align="center" style={{ cursor: 'pointer' }} component="th" scope="row">
                                    <Checkbox
                                        checked={user.is_admin}
                                        value={user.is_admin}
                                        color="primary"
                                        onClick={() => this.handleAdminClick(user.id)}
                                    />
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

export default connect(mapStoreToProps)(withStyles(styles)(UsersTable));