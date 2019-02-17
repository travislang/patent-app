import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import fieldCodes from '../../modules/template/legalCodes';
const { legalCodes, claimCodes } = fieldCodes;

class FieldMenu extends React.Component {
    render() {
        const menuItems = 
            [...legalCodes, ...claimCodes]
                .map(el => `{${el}}`)
                .map( (code, i) => {
                    return (
                        <MenuItem 
                            key={i}
                            onClick={this.props.handleClick(code)}
                        >{code}
                        </MenuItem>
                    );
                });
        return (
                <Menu
                    anchorEl={this.props.anchorEl}
                    open={Boolean(this.props.anchorEl)}
                    onClose={this.handleClose}
                >
                    {menuItems}
                </Menu>
        );
    }
}

export default FieldMenu;