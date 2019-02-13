import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Appbar from '../Appbar/Appbar';
import PreviewPage from '../PreviewPage/PreviewPage';
import Dashboard from '../Dashboard/Dashboard';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppTheme from '../MuiTheme';
import OfficeActions from '../OfficeActions/OfficeActions';
import usersPage from '../UsersPage/UsersPage';

class App extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' })
    }

    render() {
        return (
            <MuiThemeProvider theme={AppTheme}>
                <CssBaseline />
                <Router>
                    <div>
                        <Appbar />
                        <Switch>
                            {/* change redirect to dashboard */}
                            <Redirect exact from="/" to="/dashboard" />
                            <ProtectedRoute
                                path="/dashboard"
                                component={Dashboard}
                            />
                            <ProtectedRoute
                                path="/application/:id"
                                component={OfficeActions}
                            />

                            <ProtectedRoute
                                path="/office-action/:appId/:oaId"
                                component={PreviewPage}
                            />

                            <ProtectedRoute
                                path="/Users"
                                component={usersPage}
                            />

                            <Route render={() => <h1>404</h1>} />
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        )
    }
}

export default connect()(App);
