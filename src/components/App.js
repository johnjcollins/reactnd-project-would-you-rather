import React, { Component, Fragment } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a679ef',
      main: '#744cbc',
      dark: '#42218b',
      contrastText: '#fff'
    },
    secondary: {
      light: '#9affff',
      main: '#61dafb',
      dark: '#10a8c8',
      contrastText: '#000'
    }
  }
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Fragment>
          <CssBaseline />
          <BrowserRouter>
            <div>
              <Nav>
                {/* {this.props.loading === true ? null : null} */}
                <div>
                  <Route exact path="/" component={SignIn} />
                  <Route path="/home" component={Home} />
                  <Route path="/ask/:id" component={QuestionAsk} />
                  <Route path="/result/:id" component={QuestionResult} />
                  <Route path="/new" component={QuestionNew} />
                  <Route path="/leader" component={LeaderBoard} />
                </div>
              </Nav>
            </div>
          </BrowserRouter>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    loading: Object.values(users).length === 0
  };
}

export default connect(mapStateToProps)(App);
