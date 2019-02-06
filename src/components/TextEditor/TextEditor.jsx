import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Editor } from 'slate-react';

import { BoldMark, ItalicMark, UnderlinedMark, FormatToolbar } from './index';
import { isKeyHotkey } from 'is-hotkey'


import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

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
    toolbarMain: {
        flexGrow: 1
    }
});

function TitleNode(props) {
    return (
        <div {...props.attributes}>
            <Typography variant='h6' align='center' >
                {props.children}
            </Typography>
            <br />
        </div>
    )
}

class TextEditor extends Component {
    state = {
        value: this.props.initialVal,
        activeButton: -1,
        showToolbar: false
    }

    // store a reference to the editor
    ref = editor => {
        this.editor = editor
    }

    // check if current selection has mark with 'type' in it
    hasMark = type => {
        const { value } = this.state
        return value.activeMarks.some(mark => mark.type == type)
    }

    // check if currently selected block has 'type' in it
    hasBlock = type => {
        const { value } = this.state
        return value.blocks.some(node => node.type == type)
    }

    // update state to reflect proper text value
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
        console.log(e);
        this.editor.toggleMark(type);
    }

    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
            case 'underlined':
                return <UnderlinedMark {...props} />
            default:
                return next()
        }
    }

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type)
        const {classes} = this.props;
        return (
            <IconButton
                color={isActive ? 'primary' : 'default'}
                onMouseDown={e => this.onMarkClick(e, type)}
                className={classes.button}
            >
                <Icon>{icon}</Icon>
            </IconButton>
        )
    }

    renderNode = (props, editor, next) => {
        switch (props.node.type) {
            case 'title':
                return <TitleNode {...props} />
            default:
                return next()
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <FormatToolbar>
                    <div className={classes.toolbarMain}>
                        {this.renderMarkButton('bold', 'format_bold')}
                        {this.renderMarkButton('italic', 'format_italic')}
                        {this.renderMarkButton('underlined', 'format_underlined')}
                    </div>
                    <div>
                        <IconButton className={classes.button} aria-label="Delete">
                            <DeleteOutline />
                        </IconButton>
                    </div>
                </FormatToolbar>
                <Editor
                    spellCheck={false}
                    className={'mainEditor'}
                    ref={this.ref}
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                    renderNode={this.renderNode}
                />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(TextEditor);