import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class AddIssueDialog extends React.Component {

    state = {
        template_type: ''
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TEMPLATE_TYPES'})
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {classes, templates} = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleDialogClose}
                    aria-labelledby="add-new-issue"
                >
                    <DialogTitle id="add-new-issue">In response to </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ple
                        </DialogContentText>
                        <form className={classes.root} autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="template-type">Template Type</InputLabel>
                                <Select
                                    value={this.state.template_type}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'template_type',
                                        id: 'template-type',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {templates.map(template => {
                                        return (
                                            <MenuItem key={template.id} value={template.id}>{template.type}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.handleDialogClose} color="primary">
                            Add Template
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(withStyles(styles)(AddIssueDialog));