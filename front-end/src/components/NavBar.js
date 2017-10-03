import React from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'
import auth from '../auth/Auth';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { dropAuthData } from '../actions/actions';
import {Menu} from 'semantic-ui-react';

const uuidv4 = require('uuid/v4');



const NavBar = ({location, actions, expires_at}) => {
function isLoggedIn() {
  return expires_at > Date.now();
}

  return (
    <Menu stackable>
      <Menu.Item as={Link} to="/" active={location.pathname === '/'} name="Home" />
      <Menu.Item as={Link} to="/polls" active={location.pathname === '/polls'} name="View Polls" />
      <Menu.Item as={Link} to={`/poll/create/${uuidv4()}`} active={location.pathname.includes('create')} name="Create a Poll" />
      {isLoggedIn() && <Menu.Item as={Link} to="/profile" active={location.pathname === '/profile'} name="Profile" disabled={!isLoggedIn()} />}
      <Menu.Menu position="right">
        <Menu.Item name="Login" disabled={isLoggedIn()} onClick={auth.login} />
        <Menu.Item as={Link} to="/" name="Logout" disabled={!isLoggedIn()} onClick={actions.dropAuthData} />
      </Menu.Menu>
    </Menu>
  )
}
function mapStateToProps(state,ownProps) {
  return {
    expires_at: state.auth.expires_at,
  }
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({dropAuthData}, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));