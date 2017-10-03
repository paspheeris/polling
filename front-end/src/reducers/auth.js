import { INJECT_AUTH_DATA, DROP_AUTH_DATA, INJECT_PROFILE } from '../actions/actions';

function auth(state = {}, action) {
  switch(action.type){
  case INJECT_AUTH_DATA:
    const {access_token, expires_at, id_token} = action.payload;
    return {...state, access_token, expires_at, id_token};
  case DROP_AUTH_DATA:
    return {ipAddress: state.ipAddress};
  case INJECT_PROFILE:
    return {...state, profile: action.payload}
  default:
    return state;
  }
}
export default auth;