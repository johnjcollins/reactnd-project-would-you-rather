import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { compose } from 'recompose';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    margin: 10,
    width: 90,
    height: 90
  },
  icon: {
    fontSize: 24,
    color: theme.palette.secondary.main
  },
  grid: {
    backgroundColor: theme.palette.common.white
  }
});

class QuestionResult extends Component {
  render() {
    const {
      authorName,
      authorAvatar,
      optionOne,
      optionTwo,
      answer,
      classes
    } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Typography
            variant="h6"
            style={{ paddingBottom: 20 }}
          >{`Asked by ${authorName} `}</Typography>
          <Grid container spacing={16} className={classes.grid}>
            <Grid item>
              <Avatar
                src={authorAvatar}
                alt={`Avatar of ${authorName}`}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  Results:
                </Typography>
              </Grid>
              <Grid item>
                <Paper className={classes.root}>
                  {answer === 'optionOne' && (
                    <div style={{ marginBottom: 10 }}>
                      <Typography variant="caption">
                        <StarIcon className={classes.icon} /> Your Answer
                      </Typography>
                    </div>
                  )}
                  <Typography variant="subtitle2">
                    Would you rather {optionOne.text}?
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.round(
                      (optionOne.totalVotes /
                        (optionOne.totalVotes + optionTwo.totalVotes)) *
                        100
                    )}
                    style={{ height: 30 }}
                  />
                  <Typography variant="body1">
                    {`${optionOne.totalVotes} out of ${optionOne.totalVotes +
                      optionTwo.totalVotes} votes`}
                  </Typography>
                </Paper>
                <Grid item>
                  <Paper className={classes.root}>
                    {answer === 'optionTwo' && (
                      <div style={{ marginBottom: 10 }}>
                        <Typography variant="caption">
                          <StarIcon className={classes.icon} /> Your Answer
                        </Typography>
                      </div>
                    )}

                    <Typography variant="subtitle2">
                      Would you rather {optionTwo.text}?
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.round(
                        (optionTwo.totalVotes /
                          (optionOne.totalVotes + optionTwo.totalVotes)) *
                          100
                      )}
                      style={{ height: 30 }}
                    />
                    <Typography variant="body1">
                      {`${optionTwo.totalVotes} out of ${optionOne.totalVotes +
                        optionTwo.totalVotes} votes`}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

QuestionResult.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ authedUser, users, questions }, { match }) {
  const qid = match.params.id;
  const question = questions[qid];
  const authorName = users[authedUser].name;
  const authorAvatar = users[authedUser].avatarURL;
  const optionOne = {
    text: question.optionOne.text,
    totalVotes: question.optionOne.votes.length
  };
  const optionTwo = {
    text: question.optionTwo.text,
    totalVotes: question.optionTwo.votes.length
  };
  const answer = question.optionOne.votes.includes(authedUser)
    ? 'optionOne'
    : 'optionTwo';
  return {
    authorName,
    authorAvatar,
    optionOne,
    optionTwo,
    answer
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(QuestionResult);
