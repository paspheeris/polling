import { VOTE } from '../actions/actions';
import update from 'immutability-helper';

function ui(state = {}, action) {
  switch(action.type){
    case VOTE:
      if (!action.payload) {
        return update(state, {
          votePending: {$apply: bool => !bool},
          voteError: {$set: false}});
      }
      if(action.payload.error) {
        return update(state, {
          votePending: {$apply: bool => !bool},
          voteError: {$set: true}
        });
      }
      if(!action.payload.error) {
        return update(state, {votePending: {$apply: bool => !bool}});
      }
      break;
    default:
      return state;
  }
}
export default ui;