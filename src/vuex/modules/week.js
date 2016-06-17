import {
  RECEIVE_WEEK_DATA,
  UPDATE_WEEK_OFFSET,
  UPDATE_WEEK_OFFSET_MAX
} from '../mutation-types.js';

const state = {
  weekOffset: 0,
  weekOffsetMax: 0,
  temps: []
};

const mutations = {
  [RECEIVE_WEEK_DATA]: (state, temps) => {
    state.temps = temps;
  },
  [UPDATE_WEEK_OFFSET]: (state, offset) => {
    state.weekOffset = offset;
  },
  [UPDATE_WEEK_OFFSET_MAX]: (state, offset) => {
    state.weekOffsetMax = offset;
  }
};

export default {
  state,
  mutations
};
