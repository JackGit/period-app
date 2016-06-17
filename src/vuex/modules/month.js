import {
  RECEIVE_MONTH_DATA,
  UPDATE_MONTH_OFFSET,
  UPDATE_MONTH_OFFSET_MAX
} from '../mutation-types.js';

const state = {
  monthOffset: 0,
  monthOffsetMax: 0,
  temps: []
};

const mutations = {
  [RECEIVE_MONTH_DATA]: (state, temps) => {
    state.temps = temps;
  },
  [UPDATE_MONTH_OFFSET]: (state, offset) => {
    state.monthOffset = offset;
  },
  [UPDATE_MONTH_OFFSET_MAX]: (state, offset) => {
    state.monthOffsetMax = offset;
  }
};

export default {
  state,
  mutations
};
