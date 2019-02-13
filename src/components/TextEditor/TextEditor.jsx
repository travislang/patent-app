import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer'
import { Value } from 'slate';

import { BoldMark, ItalicMark, UnderlinedMark, FormatToolbar } from './index';
import { isKeyHotkey } from 'is-hotkey'

import DeleteDialog from './DeleteDialog';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import MoreVert from '@material-ui/icons/MoreVert';

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
    },
    toolbarButton: {
        padding: theme.spacing.unit / 2,
        color: theme.palette.grey[500]
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
        showToolbar: false,
        deleteDialogOpen: false
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
        const {issue} = this.props;
        // converts slate text to JSON
        const content = JSON.stringify(value.toJSON())
        if(value.document !== this.state.value.document) {
            this.props.dispatch({ type: 'UPDATE_RESPONSE', payload: {
                id: issue.resp_id,
                office_Action_Id: issue.office_action_id,
                issue_id: issue.id,
                text: content
            }})
            console.log('issue', issue);
            
        }
        this.setState({value})
    }

    handleToolbarClick = () => {
        this.setState((state, props) => ({
            showToolbar: !state.showToolbar
        }))
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

    renderBlockButton = (type, icon) => {
        const { classes } = this.props;
        let isActive = this.hasBlock(type)

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { value: { document, blocks } } = this.state;
            if (blocks.size > 0) {
                const parent = document.getParent(blocks.first().key)
                isActive = this.hasBlock('list-item') && parent && parent.type === type
            }
        }

        return (
            <IconButton
                color={isActive ? 'primary' : 'default'}
                onMouseDown={e => this.onClickBlock(e, type)}
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

    handleDeleteTemplate = () => {

    }

    handleTemplateDeleteClose = () => {
        this.setState({
            deleteDialogOpen: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.state.showToolbar ?
                    <FormatToolbar>
                        <div className={classes.toolbarMain}>
                            {this.renderMarkButton('bold', 'format_bold')}
                            {this.renderMarkButton('italic', 'format_italic')}
                            {this.renderMarkButton('underlined', 'format_underlined')}
                            {this.renderBlockButton('heading-one', 'looks_one')}
                            {this.renderBlockButton('heading-two', 'looks_two')}
                            {this.renderBlockButton('block-quote', 'format_quote')}
                            {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                            {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
                        </div>
                        <div>
                            <IconButton 
                                className={classes.button} 
                                aria-label="Delete"
                                onClick={() => {this.setState({deleteDialogOpen: true})}}
                            >
                                <DeleteOutline />
                            </IconButton>
                            <DeleteDialog 
                                open={this.state.deleteDialogOpen}
                                handleDeleteTemplate={this.handleDeleteTemplate}
                                handleTemplateDeleteClose={this.handleTemplateDeleteClose}
                            />
                            <IconButton
                                onClick={this.handleToolbarClick}
                                className={classes.toolbarButton}
                            >
                                <MoreVert />
                            </IconButton>
                        </div>
                    </FormatToolbar>
                    :
                    <FormatToolbar>
                        <div className={classes.toolbarMain}>
                        </div>
                        <IconButton
                            onClick={this.handleToolbarClick}
                            className={classes.toolbarButton}
                        >
                            <MoreVert />
                        </IconButton>
                    </FormatToolbar>
                }
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

export default connect()(withStyles(styles)(TextEditor));