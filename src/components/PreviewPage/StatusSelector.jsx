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
    'Active',
    'Inactive',
    'Pending',
];

class StatusSelector extends React.Component {
    state = {
        anchorEl: null,
        selectedIndex: 1,
    };
    

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, anchorEl: null });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl, selectedIndex } = this.state;
        let iconColor;
        if(selectedIndex === 0) {
            iconColor = '#2196f3'
        }
        else if (selectedIndex === 1) {
            iconColor = '#f44336'
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
                        aria-label="When device is locked"
                        onClick={this.handleClickListItem}
                    >
                        <ArrowDropDown />
                        <ListItemText
                            primary="Office Action Status"
                            secondary={options[this.state.selectedIndex]}
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
                            key={option}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index)}
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