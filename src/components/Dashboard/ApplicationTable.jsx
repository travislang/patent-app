import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'user_id', numeric: false, label: 'Owner' },
    { id: 'title', numeric: false, label: 'Title' },
    { id: 'applicant_name', numeric: false, label: 'Applicant' },
    { id: 'uspto_mailing_date', numeric: false, label: 'Mailing Date' },
    { id: 'uspto_status', numeric: false, label: 'Decision' },
    { id: 'status', numeric: false, label: 'Status' },
];

class EnhancedTableHead extends React.Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;
        return (
            <TableHead>
                <TableRow style={{boxShadow: 'none', backgroundColor: '#267CCE'}}>
                    {rows.map(
                        row => (
                            <TableCell
                                style={{color:'white'}}
                                key={row.id}
                                align='left'
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement='bottom-start'
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        style={{color:'white'}}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    table: {
        width: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableRow: {
        cursor: 'pointer',
        '&:nth-of-type(odd)': {
            backgroundColor: `#efefef`,
        },
    }
});

class ApplicationTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'uspto_mailing_date',
        page: 0,
        rowsPerPage: 10,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleClick = (event, appId) => {
        console.log(this.props.history.push(`/application/${appId}`)); // remove this console log after

    }



    render() {
        // console.log(this.props.applicationList)
        const { classes } = this.props;
        const data = this.props.applicationList;
        const { order, orderBy, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const displayApp = this.props.displayApp
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    return (
                                        displayApp === '1' && n.status_id === 3 || n.status_id === 1 ? // filter for active id = 3 is active / id = 1 is pending
                                            <TableRow
                                                hover
                                                className={classes.tableRow}
                                                onClick={event => this.handleClick(event, n.app_table_id)}
                                                tabIndex={-1}
                                                key={n.app_table_id}
                                            >
                                                <TableCell component="th" scope="row" align="left">
                                                    {n.user_name}
                                                </TableCell>
                                                <TableCell align="left">{n.title}</TableCell>
                                                <TableCell align="left">{n.applicant_name}</TableCell>
                                                <TableCell align="left">{n.uspto_mailing_date || 'NA'}</TableCell>
                                                <TableCell align="left">{n.uspto_status || 'NA'}</TableCell>
                                                <TableCell align="left">{n.status || 'NA'}</TableCell>
                                            </TableRow>
                                        : displayApp === '2' && n.status_id === 2 ? // filter for inactive id = 2 is inactive
                                                <TableRow
                                                    hover
                                                    className={classes.tableRow}
                                                    onClick={event => this.handleClick(event, n.app_table_id)}
                                                    tabIndex={-1}
                                                    key={n.app_table_id}
                                                >
                                                    <TableCell component="th" scope="row" align="left">
                                                        {n.user_name}
                                                    </TableCell>
                                                    <TableCell align="left">{n.title}</TableCell>
                                                    <TableCell align="left">{n.applicant_name}</TableCell>
                                                    <TableCell align="left">{n.uspto_mailing_date || 'NA'}</TableCell>
                                                    <TableCell align="left">{n.uspto_status || 'NA'}</TableCell>
                                                    <TableCell align="left">{n.status || 'NA'}</TableCell>
                                                </TableRow>
                                        : displayApp === '3' && // no filter
                                                <TableRow
                                                    hover
                                                    className={classes.tableRow}
                                                    onClick={event => this.handleClick(event, n.app_table_id)}
                                                    tabIndex={-1}
                                                    key={n.app_table_id}
                                                >
                                                    <TableCell component="th" scope="row" align="left">
                                                        {n.user_name}
                                                    </TableCell>
                                                    <TableCell align="left">{n.title}</TableCell>
                                                    <TableCell align="left">{n.applicant_name}</TableCell>
                                                    <TableCell align="left">{n.uspto_mailing_date || 'NA'}</TableCell>
                                                    <TableCell align="left">{n.uspto_status || 'NA'}</TableCell>
                                                    <TableCell align="left">{n.status || 'NA'}</TableCell>
                                                </TableRow>
                                    )
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
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
        );
    }
}

const mapStateToProps = state => ({
    applicationList: state.application.applicationList,
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(withRouter(ApplicationTable)));