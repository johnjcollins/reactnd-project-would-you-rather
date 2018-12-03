import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import QuestionSelect from './QuestionSelect';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class Home extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { answeredQuestions, unansweredQuestions, authedUser } = this.props;
    if (!authedUser) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className={classes.root}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Unanswered Questions" />
            <Tab label="Answered Questions" />
          </Tabs>

          {value === 0 && (
            <TabContainer>
              <ul style={{ listStyle: 'none' }}>
                {unansweredQuestions.map(q => (
                  <li key={q}>
                    <QuestionSelect id={q} ask={true} />
                  </li>
                ))}
              </ul>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <ul style={{ listStyle: 'none' }}>
                {answeredQuestions.map(q => (
                  <li key={q}>
                    <QuestionSelect id={q} ask={false} />
                  </li>
                ))}
              </ul>
            </TabContainer>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const allQuestions = Object.keys(questions);
  let answeredQuestions;
  let unansweredQuestions;
  if (authedUser) {
    answeredQuestions = Object.keys(users[authedUser].answers).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
    unansweredQuestions = allQuestions.filter(
      question => !answeredQuestions.includes(question)
    );
    unansweredQuestions = unansweredQuestions.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
  }

  return {
    answeredQuestions,
    unansweredQuestions,
    authedUser
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Home);
