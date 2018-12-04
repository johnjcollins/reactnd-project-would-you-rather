import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { saveAnswer } from '../actions/shared';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    margin: 10,
    width: 90,
    height: 90
  },
  button: {
    width: '100%'
  },
  grid: {
    backgroundColor: '#fff'
  },
  formControl: {
    width: '100%'
  }
});

class QuestionAsk extends Component {
  state = {
    answer: '',
    toResult: false,
    error: ''
  };

  handleSubmit = (e, id, authedUser) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { answer } = this.state;
    if (answer === '') {
      this.setState({
        error: 'Plese select an answer'
      });
    } else {
      const info = {
        authedUser,
        qid: id,
        answer: this.state.answer
      };
      dispatch(saveAnswer(info));
      this.setState({
        answer: '',
        toResult: true
      });
    }
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      answer: e.target.value
    });
  };

  render() {
    const { authedUser, question, author, classes } = this.props;
    const { toResult, error } = this.state;
    if (!question) {
      return <Redirect to="/error" />;
    }
    if (toResult === true) {
      const redirectURL = `/result/${question.id}`;
      return <Redirect to={redirectURL} />;
    }
    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="headline" style={{ paddingBottom: 20 }}>{`${
            author.name
          } asks:`}</Typography>
          <Grid container spacing={16} className={classes.grid}>
            <Grid item>
              <Avatar
                src={author.avatarURL}
                alt={`Avatar of ${author.name}`}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Would you rather...
                </Typography>
              </Grid>
              <Grid item>
                <form
                  onSubmit={e => {
                    this.handleSubmit(e, question.id, authedUser);
                  }}
                >
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <RadioGroup
                      className={classes.group}
                      value={this.state.answer}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value="optionOne"
                        control={<Radio />}
                        label={question['optionOne'].text}
                      />
                      <FormControlLabel
                        value="optionTwo"
                        control={<Radio />}
                        label={question['optionTwo'].text}
                      />
                    </RadioGroup>
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
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const id = match.params.id;
  let question = questions[id];
  let author;
  if (!question) {
    author = null;
  } else {
    author = users[question.author];
  }
  return {
    authedUser,
    question,
    author
  };
}

QuestionAsk.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(QuestionAsk);
