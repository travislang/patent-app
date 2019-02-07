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

let counter = 0;
function createData(owner, title, client, mailingDate, decision, status) {
    counter += 1;
    return { id: counter, owner, title, client, mailingDate, decision, status };
}

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
    { id: 'owner', numeric: false, label: 'Owner' },
    { id: 'title', numeric: false, label: 'Title' },
    { id: 'client', numeric: false, label: 'Client' },
    { id: 'mailingDate', numeric: false, label: 'Mailing Date' },
    { id: 'decision', numeric: false, label: 'Decision' },
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
                <TableRow>
                    {rows.map(
                        row => (
                            <TableCell
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
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class ApplicationTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'mailingDate',
        data: [
            createData('Travis', 'the widget', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 2', 'ABC Org', '02/05/2019', 'non final', 'pending'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
            createData('Travis', 'the widget 3', 'ABC Org', '02/05/2019', 'final', 'inactive'),
        ],
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

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            tabIndex={-1}
                                            key={n.id}
                                        >
                                            <TableCell component="th" scope="row" align="left">
                                                {n.owner}
                                            </TableCell>
                                            <TableCell align="left">{n.title}</TableCell>
                                            <TableCell align="left">{n.client}</TableCell>
                                            <TableCell align="left">{n.mailingDate}</TableCell>
                                            <TableCell align="left">{n.decision}</TableCell>
                                            <TableCell align="left">{n.status}</TableCell>
                                        </TableRow>
                                    );
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

export default withStyles(styles)(ApplicationTable);