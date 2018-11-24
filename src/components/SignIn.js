import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class SignIn extends Component {
  state = {
    value: this.props.users[0].id,
    toHome: false
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(setAuthedUser(this.state.value));
    this.setState({
      value: '',
      toHome: true
    });
  };

  render() {
    const { users } = this.props;
    const { value, toHome } = this.state;
    if (toHome === true) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <h3>Sign In Please</h3>
        <form onSubmit={this.handleSubmit}>
          {users ? (
            <select value={value} onChange={this.handleChange}>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          ) : (
            'No users found'
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

export default connect(
  mapStateToProps,
  null
)(SignIn);
