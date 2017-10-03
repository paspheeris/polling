import React from 'react';
// import PropTypes from 'prop-types';
// import styles from './style.css';
import auth from '../auth/Auth';


// const propTypes = {}

// const defaultProps = {}

const LoginNotice = ({message}) => {
  return (
  <div>
    <p>{message}</p>
    <p>Please <span onClick={auth.login}>Login</span></p>
  </div>
  )
}

// LoginNotice.propTypes = propTypes
// 
// LoginNotice.defaultProps = defaultProps

export default LoginNotice
