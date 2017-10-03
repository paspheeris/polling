import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {Form,   Select, Button, Divider } from 'semantic-ui-react'


// const propTypes = {}

// const defaultProps = {}

class VotePicker extends Component {
  constructor(props) {
    super(props)
    this.allChoices = this.props.allChoices;

    this.state = {
      currentVoteOption: '',
      optionInputForm: ''
    }

    this.handleVoteChoiceChange = this.handleVoteChoiceChange.bind(this);
    this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
    this.handleOptionInput = this.handleOptionInput.bind(this);
  }

  handleVoteChoiceChange(e, data) {
    this.setState({ currentVoteOption: data.value });
  }
  handleVoteSubmit(e) {
    e.preventDefault();
    let addedChoice = false;
    if (this.state.optionInputForm !== '' &&
      !this.allChoices.includes(this.state.optionInputForm)) {
      addedChoice = true;
    }
    this.props.submitVote({
      uuid: this.props._id,
      choice: this.state.optionInputForm ? this.state.optionInputForm : this.state.currentVoteOption,
      addedChoice
    });
    this.render = () => null;
  }
  handleOptionInput(e) {
    this.setState({ optionInputForm: e.target.value });
  }

  render() {
    const dropdownOptions = this.allChoices.map((choice, ind) => {return {key: choice, value: choice, text: choice}})
    const dropdownIsDisabled = this.state.optionInputForm ? true : false;
    const voteButtonIsActive = this.state.optionInputForm || this.state.currentVoteOption;
    return (
      <Form className="VotePicker-Form">
        <Form.Field>
        <label>Vote Choice:</label>
        </Form.Field>
        <Select placeholder="Choose an option..." options={dropdownOptions} 
          disabled={dropdownIsDisabled} onChange={this.handleVoteChoiceChange}/>
        <Divider horizontal>or</Divider>
        <Form.Field>
          <label>Enter your own option:</label>
          <input placeholder="choice..." value={this.state.optionInputForm} onChange={this.handleOptionInput}/>
        </Form.Field>
        <Button disabled={!voteButtonIsActive} color={voteButtonIsActive ? 'green' : 'grey'} type="submit" onClick={this.handleVoteSubmit}>Vote!</Button>
      </Form>
    )
  }
}

// VotePicker.propTypes = propTypes

// VotePicker.defaultProps = defaultProps

export default VotePicker
