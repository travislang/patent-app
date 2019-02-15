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

import { Value } from 'slate';
import templateParser from '../../modules/template/replaceTemplateFields';

import Plain from 'slate-plain-serializer';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formControl: {
        margin: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        width: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    dialogContainer: {
        minWidth: 700
    },
    textFieldArea: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        width: 500,
    },
});

class AddTemplateDialog extends React.Component {

    state = {
        template: {},
        templateText: '',
        templateId: ''
    }

    componentDidMount(){
        // this.props.dispatch({type:'FETCH_TEMPLATES', payload: {
        //     type_id:
        // }})
    }

    handleChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value,
            templateText: event.target.value.content || ''
        });
    };

    handleTemplateEdit = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    handleSubmit = () => {
        const oaId = this.props.oaId;
        const issueId = this.props.currentIssue.id;
        const text = this.state.templateText;
        const issue = this.props.currentIssue;
        
        const content = templateParser(text, issue);

        this.props.dispatch({
            type: 'POST_RESPONSE',
            payload: {
                office_Action_Id: oaId,
                issue_id: issueId,
                text: content
            }
        })
        // close modal
        this.props.handleTemplateClose();
    }
    

    render() {
        const { classes, templates } = this.props;
        return (
            <div>
                <Dialog
                    maxWidth='lg'
                    open={this.props.open}
                    className={classes.dialogContainer}
                    onClose={this.props.handleTemplateClose}
                    aria-labelledby="add-new-issue"
                >
                    <DialogTitle id="add-new-issue">Select A Template</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please select a template from the dropdown and then review it before adding it.
                        </DialogContentText>
                        <Grid container direction='column' justify='center' alignItems='center'>
                            <Grid item>
                                <form
                                    className={classes.root}
                                    autoComplete="off"
                                    onSubmit={this.handleSubmit}
                                >
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="template">Template</InputLabel>
                                        <Select
                                            value={this.state.template}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'template',
                                                id: 'template',
                                            }}
                                        >
                                            <MenuItem key={-1} value={''} >
                                                <em>None</em>
                                            </MenuItem>
                                            {templates.map((template,i) => {
                                                return (
                                                    <MenuItem 
                                                        key={i} 
                                                        value={template}
                                                    >
                                                        {template.template_name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Template Preview"
                                        multiline
                                        rows="8"
                                        value={this.state.templateText}
                                        onChange={this.handleTemplateEdit('templateText')}
                                        className={classes.textFieldArea}
                                        margin="normal"
                                        helperText="Please edit anything neccessary and then click 'add Template'"
                                        variant="outlined"
                                    />
                                </form>
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleTemplateClose} color="primary">
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

export default connect(mapStateToProps)(withStyles(styles)(AddTemplateDialog));