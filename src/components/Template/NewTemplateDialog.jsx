import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    dialogContainer: {
        minWidth: 700
    },
    textfield: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 615,
    },
    appNumTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,

        cssLabel: {
            '&$cssFocused': {
                color: 'red',
            },
        }
    },
    inputFieldsContainer: {
        margin: theme.spacing.unit
    },
    styledHeader: {
        backgroundColor: '#1796f0',
        '& h2': {
            color: 'white',
        }
    }
});


class NewTemplateDialog extends React.Component {

    state = {
        templateName: { text: '', error: false },
        user: { text: 'All', error: false },
        field: { text: '', error: false },
        templateText: { text: '', error: false }
    };

    handleChange = (key) => (event) => {

        //
        this.setState({
            [key]: { text: event.target.value, error: false }
        })

    }

    handleAddClick = () => {

        // Verify all fields not empty
        for (let key in this.state) {
            if (this.state[key].text == '') {

                // Synchonously update state and force rerender
                // setState wasn't being called in time for this.fieldsVerified()
                this.state[key].error = true;
                this.forceUpdate();
            }
        }


        if (this.fieldsVerified()) {
            // Off to SAGA! 
            this.props.dispatch({
                type: 'POST_TEMPLATE',
                payload: {
                    user_id: this.state.user.text,
                    type_id: this.state.field.text,
                    template_name: this.state.templateName.text,
                    content: this.state.templateText.text,
                }
            })

            this.props.handleClose();

            // Revert state
            for (let key in this.state) {
                this.setState({
                    [key]: { text: '', error: false }
                })
            }

        }
    }

    fieldsVerified = () => {
        for (let key in this.state) {
            if (this.state[key].error === true) {
                return false;
            }
        }

        return true;
    }

    render() {
        console.log('rendered');

        const { classes } = this.props;

        return (
            <Dialog
                maxWidth='lg'
                open={this.props.open}
                className={classes.dialogContainer}
                onClose={this.props.handleClose}
            >
                <DialogTitle className={classes.styledHeader} align='center'>
                    New Template
                </DialogTitle>

                <DialogContent>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item className={classes.inputFieldsContainer}>
                            <Grid container style={{ display: 'inline-block' }} justify='space-between'>
                                <Grid item>
                                    <Grid container direction='row'>
                                        <TextField
                                            error={this.state.templateName.error}
                                            label="Name"
                                            placeholder={'ex. 209 Rejection § 103'}
                                            className={classes.textfield}
                                            value={this.state.name}
                                            onChange={this.handleChange('templateName')}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Grid container direction='row'>
                                        <TextField
                                            select
                                            error={this.state.user.error}
                                            label="User"
                                            className={classes.appNumTextField}
                                            value={this.state.user.text}
                                            onChange={this.handleChange('user')}
                                            margin="normal"
                                            variant="outlined"
                                            margin="dense"
                                        >
                                            <MenuItem value={' '}>
                                                {'All'}
                                            </MenuItem>
                                            {this.props.reduxState.userList.map(user => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    {user.user_name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            error={this.state.field.error}
                                            select
                                            label="Template Type"
                                            className={classes.appNumTextField}
                                            value={this.state.field.text}
                                            onChange={this.handleChange('field')}
                                            margin="normal"
                                            variant="outlined"
                                            margin="dense"
                                        >
                                            <MenuItem value={''}>
                                                {'None'}
                                            </MenuItem>
                                            {this.props.reduxState.template.types.map((type, i) => (
                                                <MenuItem key={i} value={type.id}>
                                                    {type.type}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Grid container direction='row'>
                                        <TextField
                                            error={this.state.templateText.error}
                                            id="outlined-multiline-static"
                                            multiline
                                            rows="4"
                                            className={classes.textfield}
                                            margin="normal"
                                            placeholder={'Type here ...'}
                                            variant="outlined"
                                            value={this.state.templateText.text}
                                            onChange={this.handleChange('templateText')}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            this.props.handleClose();

                            // Revert state
                            for (let key in this.state) {
                                this.setState({
                                    [key]: { text: '', error: false }
                                })
                            }

                        }}
                        variant='contained'
                        color="default">
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={this.handleAddClick}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(NewTemplateDialog));