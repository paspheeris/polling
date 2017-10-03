import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Divider } from 'semantic-ui-react';

import SinglePollDisplay from './SinglePollDisplay';

const Polls = ({allPolls, allIds, filteredPolls, linkToEdit}) => {
  let pollsToShow = filteredPolls || allPolls;
  return (
    <div className="pollsDisplay-wrapper">
      {!filteredPolls &&
      <div className="pollsDisplay-topText">
        <h1>All Polls</h1>
        <i>Click on a poll to vote on it or add a choice</i>
        <Divider />
      </div>}
      {Object.values(pollsToShow).map((poll, ind) => {
        return (
          <Link key={ind} to={linkToEdit ? `/poll/edit/${poll._id}` : `/poll/vote/${poll._id}`}>
            <SinglePollDisplay key={ind} poll={poll} ind={ind}/>
          </Link>
          )
      })}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    allPolls: state.polls.byId,
    allIds: state.polls.allIds
  }
};

export default connect(mapStateToProps, () => ({}))(Polls);

