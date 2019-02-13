import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';

import { BoldMark, ItalicMark, UnderlinedMark, FormatToolbar } from './index';
import { isKeyHotkey } from 'is-hotkey'

import DeleteDialog from './DeleteDialog';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import MoreVert from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';

import './index.css';

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')

const DEFAULT_NODE = 'paragraph'

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
    },
    editorContainer: {
        position: 'relative'
    },
    editorTitle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 65
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
        
        if(value.document !== this.state.value.document) {
            // serializes text
            const content = Plain.serialize(value);
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

    onBlockClick = (event, type) => {
        event.preventDefault()

        const { editor } = this;
        const { value } = editor;
        const { document } = value;

        // Handle everything but list buttons.
        if (type != 'bulleted-list' && type != 'numbered-list') {
            const isActive = this.hasBlock(type)
            const isList = this.hasBlock('list-item')

            if (isList) {
                editor
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                editor.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type == type)
            })

            if (isList && isType) {
                editor
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                editor
                    .unwrapBlock(
                        type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type)
            } else {
                editor.setBlocks('list-item').wrapBlock(type)
            }
        }
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
            <Tooltip title={type}>
                <IconButton
                    color={isActive ? 'primary' : 'default'}
                    onMouseDown={e => this.onMarkClick(e, type)}
                    className={classes.button}
                >
                    <Icon>{icon}</Icon>
                </IconButton>
            </Tooltip>
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
            <Tooltip title={type}>
                <IconButton
                    color={isActive ? 'primary' : 'default'}
                    onMouseDown={e => this.onBlockClick(e, type)}
                    className={classes.button}
                >
                    <Icon>{icon}</Icon>
                </IconButton>
            </Tooltip>
        )
    }

    renderNode = (props, editor, next) => {
        const { attributes, children, node } = props;

        switch (node.type) {
            case 'title':
                return <TitleNode {...props} />
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
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

    getSlateHeading = (issue) => {
        if (issue.section === 'issue') {
            return `${issue.type} claims ${issue.claims}`
        }
        else {
            return issue.type
        }
    }

    render() {
        const { classes, issue } = this.props;
        return (
            <div className={classes.editorContainer}>
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
                            <Tooltip title='Delete Template'>
                                <IconButton
                                    className={classes.button}
                                    aria-label="Delete"
                                    onClick={() => { this.setState({ deleteDialogOpen: true }) }}
                                >
                                    <DeleteOutline />
                                </IconButton>
                            </Tooltip>
                            <DeleteDialog 
                                open={this.state.deleteDialogOpen}
                                handleDeleteTemplate={this.handleDeleteTemplate}
                                handleTemplateDeleteClose={this.handleTemplateDeleteClose}
                            />
                            <Tooltip title='Editor Options'>
                                <IconButton
                                    onClick={this.handleToolbarClick}
                                    className={classes.toolbarButton}
                                >
                                    <MoreVert />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </FormatToolbar>
                    :
                    <FormatToolbar>
                        <div className={classes.toolbarMain}>
                        </div>
                        <Tooltip title='Editor Options'>
                            <IconButton
                                onClick={this.handleToolbarClick}
                                className={classes.toolbarButton}
                            >
                                <MoreVert />
                            </IconButton>
                        </Tooltip>
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
                <div className={classes.editorTitle}>
                    <Typography variant='h6' align='center' >
                        {this.getSlateHeading(issue)}
                    </Typography>
                    <br />
                </div>
            </div>
        )
    }
}

export default connect()(withStyles(styles)(TextEditor));