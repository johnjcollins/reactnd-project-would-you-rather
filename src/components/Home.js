import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionSelect from './QuestionSelect';
import { showDBData } from '../utils/api';

class Home extends Component {
  render() {
    showDBData();
    const { answeredQuestions, unansweredQuestions } = this.props;
    return (
      <div>
        <h2>Home</h2>
        <h3>Answered</h3>
        <ul>
          {answeredQuestions.map(q => (
            <li key={q}>
              <QuestionSelect id={q} ask={false} />
            </li>
          ))}
        </ul>{' '}
        <h3>Unanswered</h3>
        <ul>
          {unansweredQuestions.map(q => (
            <li key={q}>
              <QuestionSelect id={q} ask={true} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const allQuestions = Object.keys(questions);
  const answeredQuestions = Object.keys(users[authedUser].answers);
  const unansweredQuestions = allQuestions.filter(
    question => !answeredQuestions.includes(question)
  );

  return {
    answeredQuestions,
    unansweredQuestions,
    authedUser
  };
}

export default connect(mapStateToProps)(Home);
