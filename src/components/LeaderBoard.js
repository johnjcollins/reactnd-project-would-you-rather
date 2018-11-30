import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

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
  button: {
    width: '100%'
  },
  grid: {
    backgroundColor: '#fff'
  }
});

const LeaderBoard = props => {
  const { authedUser, leaders, classes } = props;
  if (!authedUser) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      {leaders.map(leader => (
        <Paper className={classes.root}>
          <Grid container spacing={16} className={classes.grid}>
            <Grid item>
              <Avatar
                src={leader.avatar}
                alt={`Avatar of ${leader.name}`}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {leader.name}
                </Typography>
                <Typography gutterBottom>
                  Answered questions {leader.answered}
                </Typography>
                <Typography gutterBottom>
                  Created questions {leader.created}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={{ textAlign: 'center' }}
                >
                  Score
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={{ textAlign: 'center' }}
                >
                  {leader.score}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Fragment>
  );
};

function mapStateToProps({ users, authedUser }) {
  const leadersArr = Object.values(users);
  const leaders = leadersArr
    .map(user => ({
      name: user.name,
      avatar: user.avatarURL,
      answered: Object.keys(user.answers).length,
      created: user.questions.length,
      score: Object.keys(user.answers).length + user.questions.length
    }))
    .sort((a, b) => b.score - a.score);
  return {
    authedUser,
    leaders
  };
}

LeaderBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(LeaderBoard);
