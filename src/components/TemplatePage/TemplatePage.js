import React from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const templateInfo = this.props.state.templateReducer

class TemplatePage extends React.Component {

    // ---- handle delete function ----
    // handleDelete = (id) => {

    // }
    // ---- end of delete ----

    // ---- handle add function (need add modal) ----
    // handleAdd = () => {

    // }
    // ---- end of add ----


    // NEED TO ADD STYLE/LAYOUT
    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Issue</TableCell>
                            <TableCell>Template Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {templateInfo.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    {row.issue}
                                </TableCell>
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    x
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

// need to add template reducer into templateInfo
const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(TemplatePage);
