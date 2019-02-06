import React from 'react';
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


import PreviewDoc from '../PreviewPage/PreviewDoc';
import StatusSelector from '../PreviewPage/StatusSelector';

import { HashLink as Link } from 'react-router-hash-link';

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

function AppDrawer(props) {
    const { classes } = props;
    const primaryTypographyStyles = {
        variant: "h5",
        align: 'center'
    }
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
                    <ListItem button>
                        <ListItemIcon style={{ margin: 0 }}>
                            <ChevronLeft fontSize='large' />
                        </ListItemIcon>
                        <ListItemText className={classes.titleButton} primaryTypographyProps={primaryTypographyStyles} primary='Application # 58729540' />
                    </ListItem>
                </div>
                <Divider />
                <div>
                    <StatusSelector />
                </div>
                <Divider />
                <Typography className={classes.issuesHeading} variant='h6' align='center'>
                    Office Action Issues
                </Typography>
                <List>
                    {['Coversheet Introduction', 'Header', 'Specification Amendments', 'Claims Amendments', 'Drawings Amendments', 'Interview Summary', 'Remarks Introduction', 'Issues 1-5, 8, 37 USC 101', 'Issues 6, 7, 37 USC 102', 'Issues 11-14, 37 USC 112', 'Issues 9-10, 15-17 37 USC 103', 'Conclusion', 'Conclusion', 'Conclusion', 'Conclusion', 'Conclusion'].map((text, index) => (
                        index === 2 || index === 7 || index === 8 ? 
                            <ListItem component={Link} to='#2' button key={text}>
                                <ListItemIcon style={{ margin: 0 }}>
                                    <CheckIcon
                                        style={{ color: 'green' }} />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ style: { color: 'green' } }} primary={text} />
                            </ListItem>
                        
                        :
                        <ListItem button key={text}>
                                <ListItemText primaryTypographyProps={{color: 'textSecondary'}} primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <div>
                    <ListItem button>
                        <ListItemIcon style={{ margin: 0 }}>
                            <Add fontSize='large' />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={primaryTypographyStyles} primary='Add New Item' />
                    </ListItem>
                </div>
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

export default withStyles(styles)(AppDrawer);
