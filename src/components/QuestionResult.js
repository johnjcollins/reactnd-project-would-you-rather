import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionResult extends Component {
  render() {
    const {
      authorName,
      authorAvatar,
      optionOne,
      optionTwo,
      answer
    } = this.props;
    return (
      <div>
        <p>Asked by {authorName}</p>
        <p>
          <img src={authorAvatar} alt="" />
        </p>
        <h3>Results:</h3>
        <p>
          {answer === 'optionOne' ? '*' : null} Would you rather{' '}
          {optionOne.text}?{' '}
          {`${optionOne.totalVotes} out of ${optionOne.totalVotes +
            optionTwo.totalVotes} votes`}
        </p>
        <p>--- OR ---</p>
        <p>
          {answer === 'optionTwo' ? '*' : null} Would you rather{' '}
          {optionTwo.text}?{' '}
          {`${optionTwo.totalVotes} out of ${optionOne.totalVotes +
            optionTwo.totalVotes} votes`}
        </p>
      </div>
    );
  }
}

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

export default connect(mapStateToProps)(QuestionResult);
