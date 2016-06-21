import {
  RECEIVE_MONTH_DATA,
  UPDATE_MONTH_OFFSET,
  UPDATE_MONTH_OFFSET_MAX,
  UPDATE_MONTH_DATE_BOUNDRY
} from '../mutation-types.js';
import moment from 'moment';

const state = {
  monthOffset: 0,
  monthOffsetMax: 0,
  temps: [], // {date, temperature, period, dateString},
  dateBoundry: [moment().startOf('month').toDate(), moment().endOf('month').toDate()]
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
  },
  [UPDATE_MONTH_DATE_BOUNDRY]: (state, startDate, endDate) => {
    state.dateBoundry = [startDate, endDate];
  }
};

export default {
  state,
  mutations
};
