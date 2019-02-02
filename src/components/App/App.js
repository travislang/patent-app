import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import UserPage from '../UserPage/UserPage';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
