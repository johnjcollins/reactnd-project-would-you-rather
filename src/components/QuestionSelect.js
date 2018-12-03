import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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
  }
});

class QuestionSelect extends Component {
  toQuestion = e => {
    e.preventDefault();
    const { id, ask } = this.props;
    if (ask) {
      this.props.history.push(`/questions/${id}`);
    } else {
      this.props.history.push(`/result/${id}`);
    }
  };

  render() {
    const { name, avatar, text, classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.root}>
          <Typography
            variant="headline"
            style={{ paddingBottom: 20 }}
          >{`${name} asks:`}</Typography>
          <Grid container spacing={16} className={classes.grid}>
            <Grid item>
              <Avatar
                src={avatar}
                alt={`Avatar of ${name}`}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Would you rather
                </Typography>
                <Typography gutterBottom>{`...${text}...`}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this.toQuestion}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  const author = users[question.author];
  return {
    name: author.name,
    avatar: author.avatarURL,
    text: question.optionOne.text
  };
}

QuestionSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps)
)(QuestionSelect);
