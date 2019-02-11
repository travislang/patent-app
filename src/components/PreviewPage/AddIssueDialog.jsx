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

import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    formControl: {
        margin: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        minWidth: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    dialogContainer: {
        minWidth: 700
    },
    textField: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        width: 250,
    },
});

class AddIssueDialog extends React.Component {

    state = {
        template_type: '',
        claims: ''
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const oaId = this.props.oaId;
    //     const payloadObj = {
    //         office_action_id: oaId,
    //         template_type_id: this.state.template_type,
    //         claims: this.state.claims,
    //     }
    //     console.log('state', payloadObj);
    //     this.props.dispatch({ type: 'POST_ISSUE', payload: payloadObj})
    //     this.props.handleDialogClose();
    //     this.setState({
    //         template_type: '',
    //         claims: ''
    //     })
    // }

    render() {
        const {classes, templates} = this.props;
        return (
            <div>
                <Dialog
                    maxWidth='lg'
                    open={this.props.open}
                    className={classes.dialogContainer}
                    onClose={this.props.handleDialogClose}
                    aria-labelledby="add-new-issue"
                >
                    <DialogTitle id="add-new-issue">In response to...</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            
                        </DialogContentText>
                        <Grid container direction='column' justify='center' alignItems='center'>
                            <Grid item>
                                <form 
                                    className={classes.root} 
                                    autoComplete="off"
                                    onSubmit={this.handleSubmit}
                                    >
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
                                    <TextField
                                        id="standard-name"
                                        label="Claims"
                                        className={classes.textField}
                                        value={this.state.claims}
                                        onChange={this.handleInputChange('claims')}
                                        margin="normal"
                                        helperText="If there are any claims that this issue applies to enter them here"
                                    />
                                </form>
                            </Grid>
                        </Grid>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
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