import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Editor } from 'slate-react';

import initialValue from './initialValue';
import { BoldMark, ItalicMark, UnderlinedMark, FormatToolbar } from './index';
import { isKeyHotkey } from 'is-hotkey'


import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import './index.css';

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')

const styles = theme => ({
    button: {
        padding: theme.spacing.unit / 2,
    },
    buttonActive: {
        padding: theme.spacing.unit / 2,
        backgroundColor: theme.palette.grey[300]
    },

});


class TextEditor extends Component {
    state = {
        value: initialValue,
        activeButton: -1
    }

    ref = editor => {
        this.editor = editor;
    }

    hasMark = type => {
        const { value } = this.state
        return value.activeMarks.some(mark => mark.type == type)
    }

    onChange = ({value}) => {
        this.setState({value})
    }

    onKeyDown = (e, editor, next) => {
        let mark;
        if(isBoldHotkey(e)) {
            mark = 'bold'
        } else if(isItalicHotkey(e)) {
            mark = 'italic'
        } else if (isUnderlinedHotkey(e)) {
            mark = 'underlined'
        } else {
            return next();
        }
        e.preventDefault();
        editor.toggleMark(mark);
    }

    onMarkClick = (e, type) => {
        e.preventDefault();
        this.editor.toggleMark(type);
    }

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
            case 'underlined':
                return <UnderlinedMark {...props} />
        }
    }

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type)
        const {classes} = this.props;
        return (
            <IconButton
                color={isActive ? 'primary' : 'default'}
                onPointerDown={(e) => this.onMarkClick(e, type)}
                className={classes.button}
            >
                <Icon>{icon}</Icon>
            </IconButton>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <FormatToolbar>
                    {this.renderMarkButton('bold', 'format_bold')}
                    {this.renderMarkButton('italic', 'format_italic')}
                    {this.renderMarkButton('underlined', 'format_underlined')}
                </FormatToolbar>
                <Editor
                    spellCheck
                    autoFocus
                    className={'mainEditor'}
                    ref={this.ref}
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(TextEditor);