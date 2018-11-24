import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveNewQuestion } from '../actions/shared';

class QuestionNew extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, authedUser } = this.props;
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
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { toHome } = this.state;
    if (toHome) {
      return <Redirect to={'/home'} />;
    }
    return (
      <div>
        <h2>Create New Question</h2>
        <p>Complete the question:</p>
        <h3>Would you rather...</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="optionOne"
              value={this.state.optionOne}
              onChange={this.handleChange}
              placeholder="Enter option one text here"
              required
            />
          </div>
          <div>---- OR ----</div>
          <div>
            <input
              type="text"
              name="optionTwo"
              value={this.state.optionTwo}
              onChange={this.handleChange}
              placeholder="Enter option two text here"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(QuestionNew);
