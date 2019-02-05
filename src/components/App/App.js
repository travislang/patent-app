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
import UserPage from '../UserPage/UserPage';
import PreviewPage from '../PreviewPage/PreviewPage';
import TemplatePage from '../TemplatePage/TemplatePage';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppTheme from '../MuiTheme';

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
                            <Redirect exact from="/" to="/home" />
                            <ProtectedRoute
                                exact
                                path="/home"
                                component={UserPage}
                            />
                            <Route
                                path="/preview"
                                component={PreviewPage}
                            />
                            <Route
                                path="/template"
                                component={TemplatePage}
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
