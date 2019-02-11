import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';

import Fab from '@material-ui/core/Fab';
import CloudDownload from '@material-ui/icons/CloudDownload';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Add from '@material-ui/icons/Add';
import LensIcon from '@material-ui/icons/Lens';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PreviewDoc from '../PreviewPage/PreviewDoc';
import StatusSelector from '../PreviewPage/StatusSelector';

import { HashLink as Link } from 'react-router-hash-link';
import AddIssueDialog from '../PreviewPage/AddIssueDialog';

const drawerWidth = 300;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
    issuesHeading: {
        marginTop: 10
    },
    titleButton: {
        padding: 0
    },
    legand: {
        margin: theme.spacing.unit,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    itemColor: {
        color: 'green'
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,
        backgroundColor: theme.palette.primary.main
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

const primaryTypographyStyles = {
    variant: "h5",
    align: 'center'
}

class AppDrawer extends Component {

    state = {
        open: false,
    }

    componentDidMount() {
        const appId = this.props.match.params.appId;
        const oaId = this.props.match.params.oaId;
        // get current application
        this.props.dispatch({ type: 'FETCH_APPLICATION', payload: appId })
        // get current office action
        this.props.dispatch({ type: 'FETCH_OFFICE_ACTION', payload: {officeActionResponseId: oaId}})
        // get current office action issues
        this.props.dispatch({ type: 'FETCH_ISSUES', payload: { office_action_id: oaId } })
        // get all template types for dialog
        this.props.dispatch({ type: 'FETCH_TEMPLATE_TYPES' })
    }

    handleNewIssueDialogOpen = () => {
        this.setState({ open: true });
    };

    handleDialogClose = () => {
        this.setState({ open: false });
    }

    handleStatusChange = (statusId) => {
        const appId = this.props.match.params.appId;
        const oaId = this.props.match.params.oaId;
        console.log('statusId', statusId);
        
        this.props.dispatch({ type: 'UPDATE_OFFICE_ACTION', payload: {
            id: oaId,
            application_id: appId,
            status_id: statusId
        }})
    }

    // take user back to application view
    handleBack = () => {
        this.props.history.goBack();
    }

    render() {
        const { classes, currentApplication, officeAction, issuesList, templates } = this.props;
        const oaId = this.props.match.params.oaId;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <div>
                        <ListItem button onClick={this.handleBack}>
                            <ListItemIcon style={{ margin: 0 }}>
                                <ChevronLeft fontSize='large' />
                            </ListItemIcon>
                            <ListItemText className={classes.titleButton} primaryTypographyProps={primaryTypographyStyles} primary={`Application # ${currentApplication && currentApplication.application_number}`} />
                        </ListItem>
                    </div>
                    <Divider />
                    <div>
                        <StatusSelector 
                            handleStatusChange={this.handleStatusChange} 
                            statusId={officeAction.status_id} 
                            status={officeAction.status}
                            />
                    </div>
                    <Divider />
                    <Typography className={classes.issuesHeading} variant='h6' align='center'>
                        Office Action Issues
                    </Typography>
                    <List>
                        {issuesList.map((issue) => {
                            if (issue.section === 'header') {
                                return (
                                    issue.template_id ?
                                        <ListItem component={Link} to='#2' button key={issue.id}>
                                            <ListItemIcon style={{ margin: 0 }}>
                                                <CheckIcon
                                                    style={{ color: 'green' }} />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ style: { color: 'green' } }} primary={`${issue.type}`} />
                                        </ListItem>
                                        :
                                        <ListItem button key={issue.id} style={{ paddingLeft: 55 }}>
                                            <ListItemText primaryTypographyProps={{ color: 'textSecondary' }} primary={`${issue.type}`} />
                                        </ListItem>
                                )
                            }
                        })}
                        {issuesList.map((issue) => {
                            if (issue.section === 'amendment') {
                                return (
                                    issue.template_id ?
                                        <ListItem component={Link} to='#2' button key={issue.id}>
                                            <ListItemIcon style={{ margin: 0 }}>
                                                <CheckIcon
                                                    style={{ color: 'green' }} />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ style: { color: 'green' } }} primary={`${issue.type}`} />
                                        </ListItem>
                                        :
                                        <ListItem button key={issue.id} style={{ paddingLeft: 55 }}>
                                            <ListItemText primaryTypographyProps={{ color: 'textSecondary' }} primary={`${issue.type}`} />
                                        </ListItem>
                                )
                            }
                        })}
                        {issuesList.map((issue) => {
                            if (issue.section === 'issues') {
                                return (
                                    issue.template_id ?
                                        <ListItem component={Link} to='#2' button key={issue.id}>
                                            <ListItemIcon style={{ margin: 0 }}>
                                                <CheckIcon
                                                    style={{ color: 'green' }} />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ style: { color: 'green' } }} primary={`claims ${issue.claims} ${issue.type}`} />
                                        </ListItem>
                                        :
                                        <ListItem button key={issue.id} style={{ paddingLeft: 55 }}>
                                            <ListItemText primaryTypographyProps={{ color: 'textSecondary' }} primary={`claims ${issue.claims} ${issue.type}`} />
                                        </ListItem>
                                )
                            }
                        })}
                        {issuesList.map((issue) => {
                            if (issue.section === 'footer') {
                                return (
                                    issue.template_id ?
                                        <ListItem component={Link} to='#2' button key={issue.id}>
                                            <ListItemIcon style={{ margin: 0 }}>
                                                <CheckIcon
                                                    style={{ color: 'green' }} />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ style: { color: 'green' } }} primary={`${issue.type}`} />
                                        </ListItem>
                                        :
                                        <ListItem button key={issue.id} style={{ paddingLeft: 55 }}>
                                            <ListItemText primaryTypographyProps={{ color: 'textSecondary' }} primary={`${issue.type}`} />
                                        </ListItem>
                                )
                            }
                        })}
                    </List>
                    <Divider />
                    <div>
                        <ListItem button onClick={this.handleNewIssueDialogOpen}>
                            <ListItemIcon style={{ margin: 0 }}>
                                <Add fontSize='large' />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={primaryTypographyStyles} primary='Add New Item' />
                        </ListItem>
                    </div>
                    <AddIssueDialog 
                        open={this.state.open} 
                        templates={templates} 
                        handleDialogClose={this.handleDialogClose} 
                        oaId={oaId}
                        />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <PreviewDoc />
                </main>
                <Fab variant="extended" className={classes.fab}>
                    <CloudDownload className={classes.extendedIcon} />
                    Export as Docx
                </Fab>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentApplication: state.application.currentApplication,
    officeAction: state.application.currentOfficeActionResponse,
    issuesList: state.application.currentOficeActionIssueList,
    templates: state.template.types
});

export default connect(mapStateToProps)(withStyles(styles)(withRouter(AppDrawer)));
