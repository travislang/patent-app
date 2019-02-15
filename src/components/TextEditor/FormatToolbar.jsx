import React from 'react';

const FormatToolbar = props => (
    <div className='format-toolbar' style={{backgroundColor: '#267CCE', borderRadius:'4px 4px 0px 0px'}}>
        {props.children}
    </div>
)

export default FormatToolbar;