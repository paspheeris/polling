import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import { Message } from 'semantic-ui-react';

import { submitVote, createPoll, submitEdit } from '../actions/actions';


import SinglePollDisplay from './SinglePollDisplay';
import PollForm from './PollForm';
import LoginNotice from './LoginNotice';

class PollCreateEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.poll, redirect: null
    }
    // this.redirect = null;
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.submitPoll = this.submitPoll.bind(this);
  }

  handleTitleChange(e) {
    this.setState({
      question: e.target.value
    })
  }
  handleChoiceChange(e) {
    const ind = parseInt(e.target.dataset.something, 10);
    //Typing into the empty field
    if (e.target.name === '') {
      this.setState({
        allChoices: [...this.state.allChoices, e.target.value],
        votesByChoice: this.state.votesByChoice.concat({ choiceName: e.target.value, count: 0 })
      })
    }
    //Backspace deleting a field 
    else if (!e.target.value) {
      this.setState({
        allChoices: this.state.allChoices.filter(el => el !== e.target.name),
        votesByChoice: this.state.votesByChoice.filter(choice => choice.choiceName !== e.target.name)
      });
    }
    //Modifying an existing field
    else {
      this.setState({
        allChoices: this.state.allChoices.map((el, i) => {
          if (i === ind) return e.target.value;
          return el;
        }),
        votesByChoice: this.state.votesByChoice.map((choice, i) => {
          if (i === ind) return { choiceName: e.target.value, count: choice.count };
          return choice;
        })
      })
    }
  }
  submitPoll(e) {
    if (this.props.mode === 'edit') {
      e.preventDefault();
      this.props.actions.submitEdit({ poll: this.state });
      this.setState({
        ...this.state, redirect: "/profile"
      });
      return;
    }
    e.preventDefault();
    this.props.actions.createPoll({ poll: this.state });
    this.setState({
      ...this.state, redirect: "/polls"
    });
  }
  areDuplicateFormChoices = () => {
    let dict = this.state.allChoices.reduce((accum, choice) => {
      choice = choice.trim().toLowerCase();
      accum[choice]
        ? accum[choice]++
        : accum[choice] = 1;
      return accum;
    }, {});
    return Object.values(dict).some(count => count > 1);
  }

  componentDidMount() {
    this.setState({
      ...this.state.poll, key: this.props.uuid, author_id: this.props.userId
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.poll
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { mode, userId } = this.props;
    if (!userId) return (<LoginNotice message="You must be logged in to create or edit a poll." />);
    return (
      <div className="PollCreateEdit-wrapper">
        {this.areDuplicateFormChoices() && <Message header='Poll choices must be unique' error />}
        <PollForm question={this.state.question} choices={this.state.allChoices} handleTitleChange={this.handleTitleChange} handleChoiceChange={this.handleChoiceChange} mode={mode} submitPoll={this.submitPoll} areDuplicateFormChoices={this.areDuplicateFormChoices()} />
        <div className="PollVoteView-canvas-wrapper">
          <SinglePollDisplay poll={this.state} />
        </div>
      </div>
    )
  }
}

const blankPoll = {
  key: "",
  author_id: "",
  author_name: "",
  created: Date.now(),
  question: "Poll Question",

  allChoices: ["Choice A", "Choice B"],
  votesByChoice: [{ choiceName: "Choice A", count: 0 }, { choiceName: "Choice B", count: 0 }],
  participants: []
}

function mapStateToProps(state, ownProps) {
  return {
    poll: state.polls.byId[ownProps.match.params.uuid] || blankPoll,
    uuid: ownProps.match.params.uuid,
    mode: ownProps.match.params.mode,
    userId: state.auth.profile ? state.auth.profile.sub : null
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ submitVote, createPoll, submitEdit }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollCreateEdit);