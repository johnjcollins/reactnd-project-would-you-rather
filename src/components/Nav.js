import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { removeAuthedUser } from '../actions/authedUser';

class Nav extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.dispatch(removeAuthedUser());
    this.props.history.push('/');
  };

  render() {
    const { name } = this.props;
    return (
      <div>
        <ul>
          <li>
            {name !== null ? (
              <NavLink to="/home" exact>
                Home
              </NavLink>
            ) : (
              <span>Home</span>
            )}
          </li>
          <li>
            {name !== null ? (
              <NavLink to="/new" exact>
                New Question
              </NavLink>
            ) : (
              <span>New Question</span>
            )}
          </li>
          <li>
            {name !== null ? (
              <NavLink to="/leader" exact>
                Leader Board
              </NavLink>
            ) : (
              <span>Leader Board</span>
            )}
          </li>
        </ul>
        {name && `Hello, ${name}`}{' '}
        {name && <button onClick={this.handleClick}>Logout</button>}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const name = authedUser ? users[authedUser].name : null;
  return {
    name
  };
}
export default withRouter(connect(mapStateToProps)(Nav));
