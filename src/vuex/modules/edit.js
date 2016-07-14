import {
  UPDATE_EDIT_PAGE_TEMPERATURE,
  UPDATE_EDIT_PAGE_PERIOD,
  UPDATE_EDIT_PAGE_DATE
} from '../mutation-types.js';

const state = {
  temp: '',
  period: false,
  date: null
};

const mutations = {
  [UPDATE_EDIT_PAGE_TEMPERATURE]: (state, temp) => {
    state.temp = temp;
  },
  [UPDATE_EDIT_PAGE_PERIOD]: (state, period) => {
    state.period = period;
  },
  [UPDATE_EDIT_PAGE_DATE]: (state, date) => {
    state.date = date;
  }
};

export default {
  state,
  mutations
};
