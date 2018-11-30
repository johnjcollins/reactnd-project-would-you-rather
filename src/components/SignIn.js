import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { setAuthedUser } from '../actions/authedUser';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 450,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  typo: {
    textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    alignSelf: 'center'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SignIn extends Component {
  state = {
    value: '',
    toHome: false,
    error: ''
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value } = this.state;
    if (value === '') {
      this.setState({
        error: 'Please select a user'
      });
    } else {
      this.props.dispatch(setAuthedUser(this.state.value));
      this.setState({
        value: '',
        toHome: true
      });
    }
  };

  render() {
    const { users, classes } = this.props;
    const { value, toHome, error } = this.state;
    if (toHome === true) {
      return <Redirect to="/home" />;
    }
    return (
      <Fragment>
        <Paper className={classes.root} elevation={4}>
          <Typography
            variant="h5"
            className={classes.typo}
            gutterBottom
            color="primary"
          >
            Welcome to the Would You Rather App!
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.typo}
            gutterBottom
            color="secondary"
          >
            Please Sign In
          </Typography>
          <form
            onSubmit={this.handleSubmit}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            {users ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="user-simple">User</InputLabel>
                  <Select
                    value={value}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'user',
                      id: 'user-simple'
                    }}
                    required={true}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {users.map(user => (
                      <MenuItem value={user.id} key={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
                <FormControl className={classes.formControl}>
                  <Button type="submit" variant="contained" color="secondary">
                    Submit
                  </Button>
                </FormControl>
              </div>
            ) : (
              'No users found'
            )}
          </form>
        </Paper>
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(SignIn);
