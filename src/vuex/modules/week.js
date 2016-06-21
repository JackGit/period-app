import {
  RECEIVE_WEEK_DATA,
  UPDATE_WEEK_OFFSET,
  UPDATE_WEEK_OFFSET_MAX,
  UPDATE_WEEK_DATE_BOUNDRY
} from '../mutation-types.js';
import moment from 'moment';

const state = {
  weekOffset: 0,
  weekOffsetMax: 0,
  dateBoundry: [moment().startOf('week').toDate(), moment().endOf('week').toDate()],
  temps: [] // {date, temperature, period, dateString}
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
  },
  [UPDATE_WEEK_DATE_BOUNDRY]: (state, startDate, endDate) => {
    state.dateBoundry = [startDate, endDate];
  }
};

export default {
  state,
  mutations
};
