import React from 'react';
import { Divider } from 'semantic-ui-react';

const LandingPage = () => {
  return (
    <div className="LandingPage-wrapper">
      <h1 className="LandingPage-topText">Polling App</h1>
      <Divider />
      <ul className="features-list">
        <li>Create and share polls with your friends</li>
        <li>Vote on other's polls</li>
        <li>View and edit the polls you've created</li>
        <li>No registration required: log on with a Google or GitHub account</li>
      </ul>
      <img className="ballotBox-image" src='ballotBox.svg' alt="<div>Icons made by <a href='http://www.freepik.com' title='Freepik'>Freepik</a> from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a> is licensed by <a href='http://creativecommons.org/licenses/by/3.0/' title='Creative Commons BY 3.0' target='_blank'>CC 3.0 BY</a></div>'" />
    </div>
  )
}

export default LandingPage;