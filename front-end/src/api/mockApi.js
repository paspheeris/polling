import { polls, users } from './mockData';
import auth from '../auth/Auth';
import update from 'immutability-helper';

const DELAY = 500;


export default class mockApi {
  constructor() {
    this.polls = polls;

    this.submitVote = this.submitVote.bind(this);
  }
  static fetchAll() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          status: "SUCCESS",
          apiData: { users, polls }
        });
      }, DELAY);
    });
  }
  submitVote(payload, polls = this.polls) {

    return new Promise((res, rej) => {
      setTimeout(() => {
        const { uuid, choice } = payload;
        if (polls.byId[uuid].allChoices.includes(choice)) {
          polls = update(polls, { byId: { [uuid]: { votesByChoice: { [choice]: { $apply: x => x + 1 } } } } });
        } else {
          polls = update(polls, {
            byId: {
            [uuid]: {
              votesByChoice: { $merge: { [choice]: 1 } },
              allChoices: { $push: [choice] }
            }
            }
          });
        }
        this.polls = polls;
        res(polls.byId[uuid]);
      }, DELAY);
    });
  }
  static createPoll() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({ status: "SUCCESS" });
      }, DELAY);
    });
  }
}