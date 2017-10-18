/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

// const propTypes = {}

// const defaultProps = {}

class PollForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  createButtonIsActive = () => {
    if (this.props.choices[0] === "Choice A"
      && this.props.choices[1] === "Choice B"
      && this.props.question === "Poll Question"
      && this.props.choices.slice(2).every(q => q === '')
      || this.props.areDuplicateFormChoices) {
      return false;
    }
    return true;
  }
  buttonText = () => {
    return this.props.mode === 'edit'
      ? 'Edit poll!'
      : 'Create poll!'
  }

  render() {
    let { question, choices, submitPoll } = this.props;
    return (
      <div className="PollForm-wrapper">
        <Form className="Poll-form">
          <Form.Field>
            <label>Question:</label>
            <input type="text" name="question" value={question} onChange={this.props.handleTitleChange} />
          </Form.Field>
          <Form.Field>
            <label>Choices:</label>
            {choices.concat('').map((choice, ind) => {
              return <input key={ind} type="text" name={choice} value={choice} onChange={this.props.handleChoiceChange} data-something={ind} />
            })}
          </Form.Field>
          <Button disabled={!this.createButtonIsActive()} color={this.createButtonIsActive() ? 'green' : 'grey'} type="submit" onClick={submitPoll}>{this.buttonText()}</Button>
        </Form>
      </div>
    )
  }
}

export default PollForm
