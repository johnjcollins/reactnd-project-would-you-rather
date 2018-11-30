import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveNewQuestion } from '../actions/shared';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
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
  } // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap'
  // },
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200
  // },
  // dense: {
  //   marginTop: 19
  // },
  // menu: {
  //   width: 200
  // }
});

class QuestionNew extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
    error: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, authedUser } = this.props;
    const { optionOne, optionTwo } = this.state;
    if (optionOne === '' || optionTwo === '') {
      this.setState({
        error: 'Please enter both options'
      });
    } else {
      const question = {
        optionOneText: this.state.optionOne,
        optionTwoText: this.state.optionTwo,
        author: authedUser
      };
      dispatch(saveNewQuestion(question));
      this.setState({
        optionOne: '',
        optionTwo: '',
        toHome: true
      });
    }
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { optionOne, optionTwo, toHome, error } = this.state;
    if (toHome) {
      return <Redirect to={'/home'} />;
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography
          variant="h5"
          className={classes.typo}
          gutterBottom
          color="primary"
        >
          Create New Question
        </Typography>
        <Typography
          variant="subtitle1"
          className={classes.typo}
          gutterBottom
          color="secondary"
        >
          Would you rather...
        </Typography>
        <form
          onSubmit={this.handleSubmit}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          <FormControl className={classes.formControl}>
            <TextField
              name="optionOne"
              label="Option One"
              value={optionOne}
              className="classes.textField"
              onChange={this.handleChange}
            />
          </FormControl>
          <Typography variant="caption" color="inherit">
            OR
          </Typography>
          <FormControl className={classes.formControl}>
            <TextField
              name="optionTwo"
              label="Option Two"
              value={optionTwo}
              className="classes.textField"
              onChange={this.handleChange}
            />
          </FormControl>
          <Typography variant="caption" color="error">
            {error}
          </Typography>
          <FormControl className={classes.formControl}>
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          </FormControl>
        </form>
      </Paper>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

QuestionNew.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(QuestionNew);
