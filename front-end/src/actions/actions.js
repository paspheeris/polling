// import mockApi from '../api/mockApi';
import prodApi from '../api/prodApi';
import auth from '../auth/Auth';

export const VOTE = 'VOTE';
export const FETCH_DATA = 'FETCH_DATA';
export const CREATE_POLL = 'CREATE_POLL';
export const INJECT_AUTH_DATA = 'INJECT_AUTH_DATA';
export const DROP_AUTH_DATA = 'DROP_AUTH_DATA';
export const INJECT_PROFILE = 'INJECT_PROFILE';
export const EDIT_POLL = 'EDIT_POLL';

// const mock = new mockApi();
const prod = new prodApi();
export const submitVote = thunkCreate(prod.submitVote, VOTE);
export const createPoll = thunkCreate(prod.createPoll, CREATE_POLL);
export const fetchData = thunkCreate(prod.fetchAll, FETCH_DATA);
export const submitEdit = thunkCreate(prod.submitEdit, EDIT_POLL);
// export function injectAuthData(payload) {
//   console.log(payload);
//   const payload2 = auth.handleAuthentication(payload.hash);
  

//   console.log(payload2);
//   return {
//     type: INJECT_AUTH_DATA,
//     payload,
//   }
// }
export function injectAuthData(payload) {
    return dispatch => {
      // console.log(payload);
      return new Promise((res, rej) => {
        return auth.handleAuthentication(payload.hash, res, rej);
      }).then(data => {
        // console.log(data);
        dispatch({
          type: INJECT_AUTH_DATA,
          payload: data
        });
        return new Promise((res, rej) => {
          auth.getProfile(res, rej);
        })
      }).then(profile => {
        console.log(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
        dispatch({
          type: INJECT_PROFILE,
          payload: profile
        })
      })
        .catch(err => {
        console.log(err);
      })
    //   console.log(payload2);
    //   return {
    //     type: INJECT_AUTH_DATA,
    //     payload,
    // }
  }
}
export function dropAuthData() {
  auth.logout();
  return {
    type: DROP_AUTH_DATA
  }
}

function thunkCreate(apiMethod, type) {
  return (payload={}) => {
      // console.log(payload.nativeEvent);

      //If one of the exported thunks is called inline in a react component
      //(rather than explicitly provided with a payload), it will pass in a 
      //synthetic event. Here we check to see if payload is a synthetic event,
      //and if so we instead set it to an empty object
      if(payload.nativeEvent) {
        payload = {};
      }
    return (dispatch, getState) => {
      console.log('getstate in thunkcreator', getState());
      const {auth} = getState();
      if(auth) {
        payload = {...payload, auth};
      }
      console.log(`dispatching initial ${type}`);
      dispatch({type});
      console.log(payload);
      // return apiMethod.apply(api, payload)
      return apiMethod(payload)
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          console.log('responseData in thunkCreator', responseData);
          console.log(`dispatching ${type} success`);
          //Data received from the api; merge it with the payload data 
          //from when the action initiated
          payload = {...payload, responseData};
          dispatch({
            type,
            payload
          });
        })
        .catch(error => {
          console.log(error);
          dispatch({
            type,
            payload: {error}
          });
        })
    }
  }
}
// export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
// export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
// export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// export const VOTE_PENDING = 'VOTE_PENDING';
// export const VOTE_SUCCESS = 'VOTE_SUCCESS';
// export const VOTE_FAILURE = 'VOTE_FAILURE';



// export function voteSuccess(pollUUID, choice) {
//   return {
//     type: VOTE_SUCCESS,
//     payload: { pollUUID, choice } 
//   }
// }
// export function votePending() {
//   return { 
//     type: VOTE_PENDING
//   }
// }
// export function voteFailure(error) {
//   return {
//     type: VOTE_FAILURE,
//     payload: {error}
//   }
// }
// export function submitVote(pollUUID, choice) {
//   return dispatch => {
//     return mockApi.submitVote(pollUUID, choice)
//       .then(response => {
//         if(response === "LOGGED_IN") {
//           console.log("dispatching voteSuccess");
//           dispatch(voteSuccess(pollUUID, choice));
//         }
//       })
//       .catch(error => {
//         console.error(error);
//         dispatch(voteFailure(error));
//       });
//   }
// }

// console.log(submitVote);




// export function fetchDataPending() {
//   return {type: FETCH_DATA_PENDING}
// }
// export function fetchDataSuccess(data) {
//   return {type: FETCH_DATA_SUCCESS, payload: {data}}
// }
// export function fetchDataFailure(error) {
//   return {type: FETCH_DATA_FAILURE, payload: {error}}
// }


//thunk
// export function fetchData() {
//   console.log("starting fetchData thunk");
//   return dispatch => {
//     return mockApi.fetchAll()
//       .then(data => {
//         console.log("dispatching fetchDataSuccess");
//         dispatch(fetchDataSuccess(data));
//       })
//       .catch(error => {
//         dispatch(fetchDataFailure(error));
//       });
//   }
// }

