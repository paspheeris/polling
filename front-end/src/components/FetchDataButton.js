import { fetchData } from '../actions/actions';

import React from 'react';  

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class FetchDataButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }  
  
  render() {

    return <button onClick={this.props.actions.fetchData}>Fetch Data</button>
  
}
}

function mapStateToProps(state) {
  return {
    polls: state.polls.byId,
    allIds: state.polls.allIds
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({fetchData}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchDataButton);