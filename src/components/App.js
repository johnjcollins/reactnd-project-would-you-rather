import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import SignIn from './SignIn';
import QuestionAsk from './QuestionAsk';
import QuestionResult from './QuestionResult';
import QuestionNew from './QuestionNew';
import LeaderBoard from './LeaderBoard';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <h2>Would You Rather?</h2>
          {this.props.loading === true ? null : (
            <div>
              <Route exact path="/" component={SignIn} />
              <Route path="/home" component={Home} />
              <Route path="/ask/:id" component={QuestionAsk} />
              <Route path="/result/:id" component={QuestionResult} />
              <Route path="/new" component={QuestionNew} />
              <Route path="/leader" component={LeaderBoard} />
            </div>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    loading: Object.values(users).length === 0
  };
}

export default connect(mapStateToProps)(App);
