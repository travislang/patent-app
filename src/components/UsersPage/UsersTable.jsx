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

    /*
    
    "user_name" VARCHAR (20) UNIQUE NOT NULL,
      "password" VARCHAR (255) NOT NULL,
      "is_admin" BOOLEAN DEFAULT FALSE,
      "signature_name" VARCHAR(70),
      "registration_number" VARCHAR(10),
      "phone_number" VARCHAR(20),
      "firm_name" VARCHAR(70),
      "uspto_customer_number" VARCHAR(9),
      "deposit_account_number" VARCHAR(9),
      "active" BOOLEAN DEFAULT TRUE
  
    */

    render() {

        console.log('Hello');
        
        const { classes , users} = this.props;

        console.log(this.props);
        
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="left">Signature name</TableCell>
                            <TableCell align="left">Registration number</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Firm</TableCell>
                            <TableCell align="left">Customer number</TableCell>
                            <TableCell align="left">Deposit Account Number</TableCell>
                            <TableCell align="left">Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { users.map(user => (
                            <TableRow key={user.id}>
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
                                    {user.active}
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