import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


// styles
const styles = theme => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  loginMessage: {
    height: theme.spacing.unit * 2,
  },
  textColor: {
    color: 'red',
  },
  paper: {
    marginTop: theme.spacing.unit * 18,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 9}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 9}px`,
  },
});

// component
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    console.log('got here');

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <form onSubmit={this.login}>
            <div>
              <Typography variant="h4" align="center">Login</Typography>
            </div>
            <div>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="username">
                  Username
              </InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </FormControl>
            </div>
            <div>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">
                  Password
              </InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </FormControl>
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </div>
            <div>
              <Button
                fullWidth
                type="submit"
                name="submit"
                value="Log In"
                color="primary"
                variant="outlined"
              >
                Log In
            </Button>
            </div>
          </form>
          <div className={classes.loginMessage}>
            <Typography variant='caption' color='textSecondary' align='center' className={classes.textColor}>
              {this.props.errors.loginMessage && this.props.errors.loginMessage}
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
