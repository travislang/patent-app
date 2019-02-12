import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LensIcon from '@material-ui/icons/Lens';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const options = [
    'Pending',
    'Inactive',
    'Active',
];

class StatusSelector extends React.Component {
    state = {
        anchorEl: null,
    };
    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleMenuItemClick = (event, index) => {
        this.setState({ anchorEl: null });
        this.props.handleStatusChange(index);
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const selectedIndex = this.props.statusId;
        let iconColor;
        // active - blue
        if (selectedIndex === 3) {
            iconColor = '#2196f3'
        }
        // inactive - red
        else if (selectedIndex === 2) {
            iconColor = '#f44336'
            // pending - yellow
        } else {
            iconColor = '#ffeb3b'
        }
        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="office action status"
                        onClick={this.handleClickListItem}
                    >
                        <ArrowDropDown />
                        <ListItemText
                            primary="Office Action Status"
                            secondary={options[selectedIndex - 1]}
                        />

                    </ListItem>
                </List>
                <LensIcon style={{ color: iconColor, fontSize: 30 }} />
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={index + 1}
                            selected={(index + 1) === selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index + 1)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(StatusSelector);