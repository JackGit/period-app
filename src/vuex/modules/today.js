import {
  RECEIVE_TODAY_DATA,
  UPDATE_TODAY_DATA
} from '../mutation-types.js';

const state = {
  temp: {
    id: null,
    temperature: null,
    period: null,
    date: null
  }
};

const mutations = {
  [RECEIVE_TODAY_DATA]: (state, temp) => {
    state.temp = temp;
  },
  [UPDATE_TODAY_DATA]: (state, temp) => {
    state.temp = temp;
  }
};

export default {
  state,
  mutations
};
