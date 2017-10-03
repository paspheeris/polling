//Check in local storage for a persisted state. If none is found, or an error, return 'undefined' and let the reducers handle initialising state
// import {users, polls} from './api/mockData';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Error loading localState', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('Error saving to localState', err);
  }
} 