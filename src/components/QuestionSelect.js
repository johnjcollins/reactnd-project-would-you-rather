import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class QuestionSelect extends Component {
  toQuestion = e => {
    e.preventDefault();
    const { id, ask } = this.props;
    if (ask) {
      this.props.history.push(`/ask/${id}`);
    } else {
      this.props.history.push(`/result/${id}`);
    }
  };

  render() {
    const { name, avatar, text } = this.props;
    return (
      <div>
        <img src={avatar} alt={`Avatar of ${name}`} />
        <h2>{name} asks:</h2>
        <h3>Would you rather</h3>
        <p>...{text}...</p>
        <button onClick={this.toQuestion}>View Poll</button>
        <hr />
      </div>
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

export default withRouter(connect(mapStateToProps)(QuestionSelect));
