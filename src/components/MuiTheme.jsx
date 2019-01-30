import { createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';


const AppTheme = createMuiTheme({

    palette: {
        type: 'light',
        primary: blue,
        secondary: {
            main: deepOrange,
        },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

export default AppTheme;