import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveAnswer } from '../actions/shared';

class QuestionAsk extends Component {
  state = {
    answer: '',
    toResult: false
  };

  handleSubmit = (e, id, authedUser) => {
    e.preventDefault();
    const { dispatch } = this.props;
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
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      answer: e.target.value
    });
  };

  render() {
    const { authedUser, question } = this.props;
    const { toResult } = this.state;
    if (toResult === true) {
      const redirectURL = `/result/${question.id}`;
      return <Redirect to={redirectURL} />;
    }
    return (
      <div>
        <form
          onSubmit={e => {
            this.handleSubmit(e, question.id, authedUser);
          }}
        >
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  value="optionOne"
                  checked={this.state.answer === 'optionOne'}
                  onChange={this.handleChange}
                />
                {question['optionOne'].text}
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  value="optionTwo"
                  checked={this.state.answer === 'optionTwo'}
                  onChange={this.handleChange}
                />
                {question['optionTwo'].text}
              </label>
            </li>
          </ul>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const id = match.params.id;
  const question = questions[id];
  const author = users[question.author];
  return {
    authedUser,
    question,
    author
  };
}

export default connect(mapStateToProps)(QuestionAsk);
