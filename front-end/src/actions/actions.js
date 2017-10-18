import prodApi from '../api/prodApi';
import auth from '../auth/Auth';

export const VOTE = 'VOTE';
export const FETCH_DATA = 'FETCH_DATA';
export const CREATE_POLL = 'CREATE_POLL';
export const INJECT_AUTH_DATA = 'INJECT_AUTH_DATA';
export const DROP_AUTH_DATA = 'DROP_AUTH_DATA';
export const INJECT_PROFILE = 'INJECT_PROFILE';
export const EDIT_POLL = 'EDIT_POLL';

const prod = new prodApi();
export const submitVote = thunkCreate(prod.submitVote, VOTE);
export const createPoll = thunkCreate(prod.createPoll, CREATE_POLL);
export const fetchData = thunkCreate(prod.fetchAll, FETCH_DATA);
export const submitEdit = thunkCreate(prod.submitEdit, EDIT_POLL);

export function injectAuthData(payload) {
  return dispatch => {
    return new Promise((res, rej) => {
      return auth.handleAuthentication(payload.hash, res, rej);
    }).then(data => {
      dispatch({
        type: INJECT_AUTH_DATA,
        payload: data
      });
      return new Promise((res, rej) => {
        auth.getProfile(res, rej);
      })
    }).then(profile => {
      localStorage.setItem('profile', JSON.stringify(profile));
      dispatch({
        type: INJECT_PROFILE,
        payload: profile
      })
    })
      .catch(err => {
        console.log(err);
      })
  }
}
export function dropAuthData() {
  auth.logout();
  return {
    type: DROP_AUTH_DATA
  }
}

function thunkCreate(apiMethod, type) {
  return (payload = {}) => {
    //If one of the exported thunks is called inline in a react component
    //(rather than explicitly provided with a payload), it will pass in a 
    //synthetic event. Here we check to see if payload is a synthetic event,
    //and if so we instead set it to an empty object
    if (payload.nativeEvent) {
      payload = {};
    }
    return (dispatch, getState) => {
      const { auth } = getState();
      if (auth) {
        payload = { ...payload, auth };
      }
      dispatch({ type });
      return apiMethod(payload)
        .then(response => {
          console.log('raw response:', response);
          return response.json();
        })
        .then(responseData => {
          //Data received from the api; merge it with the payload data 
          //from when the action initiated
          console.log('parsed responseData:', responseData);
          payload = { ...payload, responseData };
          dispatch({
            type,
            payload
          });
        })
        .catch(error => {
          console.log(error);
          dispatch({
            type,
            payload: { error }
          });
        })
    }
  }
}

