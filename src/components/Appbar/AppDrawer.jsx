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

import PreviewDoc from '../PreviewPage/PreviewDoc';
import PreviewAppbar from './PreviewAppbar';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        maxWidth: '80vw',
        marginTop: 80,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        position: 'relative'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerTitle: {
        padding: theme.spacing.unit * 2
    },
    toolbar: {
        ...theme.mixins.toolbar,
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

    return (
        <div className={classes.root}>
            <CssBaseline />
            <PreviewAppbar />
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
                <Typography className={classes.drawerTitle} variant='button'>
                    Current Issues for Patent Application # 58729540
                </Typography>
                <Divider />
                <List>
                    {['Issues 1-5, 8, 37 USC 101', 'Issues 6, 7, 37 USC 102', 'Issues 11-14, 37 USC 112', 'Issues 9-10, 15-17 37 USC 103'].map((text, index) => (
                        index === 2 ? 
                            <ListItem  button key={text}>
                            <ListItemIcon style={{margin: 0}}>
                                    <CheckIcon 
                                        style={{color: 'green'}}/>
                            </ListItemIcon>
                                <ListItemText primaryTypographyProps={{style:{color: 'green'} }} primary={text} />
                        </ListItem>
                        :
                            <ListItem button key={text}>
                                <ListItemText primaryTypographyProps={{color: 'textSecondary'}} primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography className={classes.drawerTitle} variant='button'>
                    Add New Issue +
                </Typography>
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
