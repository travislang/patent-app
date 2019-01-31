import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import IconButton from '@material-ui/core/IconButton';

import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';

// import Icon from 'react-icons-kit';
// import {bold} from 'react-icons-kit/feather/bold';
// import {italic} from 'react-icons-kit/feather/italic';

import {BoldMark, ItalicMark, FormatToolbar} from './index';

import './index.css';

const styles = theme => ({
    button: {
        padding: theme.spacing.unit / 2,
    },
});

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragragh',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'My first para'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})


class TextEditor extends Component {
    state = {
        value: initialValue
    }

    onChange = ({value}) => {
        this.setState({value})
    }

    onKeyDown = (e, change) => {
        if(!e.metaKey) {
            return;
        }
        e.preventDefault();
        switch(e.key){
            case 'b': {
                change.toggleMark('bold')
                return true
            }
            case 'i': {
                change.toggleMark('italic')
                return true
            }
            default: {
                return true
            }

        }
    }

    onMarkClick = (e, type) => {
        e.preventDefault();
        const { value } = this.state;
        const change = value.change().toggleMark(type);
        this.onChange(change);
    }

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <FormatToolbar>
                    <IconButton 
                        onPointerDown={(e) => this.onMarkClick(e, 'bold')}
                        className={classes.button}
                    >
                        <FormatBold />
                    </IconButton>
                    <IconButton 
                        onPointerDown={(e) => this.onMarkClick(e, 'italic')}
                        className={classes.button}
                    >
                        <FormatItalic />
                    </IconButton>
                </FormatToolbar>
                <Editor
                    className={'mainEditor'}
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