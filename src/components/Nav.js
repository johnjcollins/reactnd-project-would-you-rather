import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { removeAuthedUser } from '../actions/authedUser';
import { compose } from 'recompose';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  grow: { flexGrow: 1 },
  dispflex: { display: 'flex', alignItems: 'center' },
  margin: { marginRight: 15 }
});

class Nav extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.dispatch(removeAuthedUser());
    this.props.history.push('/');
  };

  render() {
    const {
      authedUser,
      name,
      avatar,
      classes,
      children,
      location: { pathname }
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="secondary" className={classes.grow}>
              Would You Rather?
            </Typography>
            {authedUser && (
              <div>
                <div className={classes.dispflex}>
                  <Avatar src={avatar} alt={name} className={classes.margin} />
                  <Typography
                    variant="body1"
                    color="inherit"
                    className={classes.margin}
                  >
                    {name && `Hello, ${name}`}
                  </Typography>
                  <Button
                    color="secondary"
                    className={classes.grow}
                    onClick={this.handleClick}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <MenuList>
            <MenuItem
              component={Link}
              to="/home"
              selected={'/home' === pathname}
              disabled={authedUser === null}
            >
              Home
            </MenuItem>
            <MenuItem
              component={Link}
              to="/add"
              selected={'/new' === pathname}
              disabled={authedUser === null}
            >
              New Question
            </MenuItem>
            <MenuItem
              component={Link}
              to="/leaderboard"
              selected={'/leaderboard' === pathname}
              disabled={authedUser === null}
            >
              Leader Board
            </MenuItem>
          </MenuList>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const name = authedUser ? users[authedUser].name : null;
  const avatar = authedUser ? users[authedUser].avatarURL : null;
  return {
    authedUser,
    name,
    avatar
  };
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps)
)(Nav);
