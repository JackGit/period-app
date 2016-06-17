import API from 'api';
import moment from 'moment';
import { assembleTempObjFromResultObj } from './utils.js';
import {
  RECEIVE_WEEK_DATA,
  UPDATE_WEEK_OFFSET,
  UPDATE_WEEK_OFFSET_MAX
} from '../mutation-types.js';

export const getMaxWeekOffset = (store) => {
  var thisWeekIndex = moment().week();
  var firstWeekIndex;

  API.Temperature.getTheFirstTempData().then(result => {
    firstWeekIndex = moment(result.get('date')).week();
    store.dispatch(UPDATE_WEEK_OFFSET_MAX, thisWeekIndex - firstWeekIndex);
  });
};

export const getThisWeekTemps = (store) => {
  var startDate = moment().startOf('week').toDate();
  var endDate = moment().endOf('week').toDate();

  API.Temperature.getTempsByDateRange(startDate, endDate).then(results => {
    store.dispatch(
      RECEIVE_WEEK_DATA,
      results.map(function (result) {
        return assembleTempObjFromResultObj(result);
      })
    );

    store.dispatch(UPDATE_WEEK_OFFSET, 0);
  });
};

export const getNextWeekTemps = (store) => {
  var offset = store.state.week.weekOffset + 1;
  var startDate = moment().startOf('week').add(7 * offset, 'days').toDate();
  var endDate = moment().endOf('week').add(7 * offset, 'days').toDate();

  API.Temperature.getTempsByDateRange(startDate, endDate).then(results => {
    store.dispatch(
      RECEIVE_WEEK_DATA,
      results.map(function (result) {
        return assembleTempObjFromResultObj(result);
      })
    );

    store.dispatch(UPDATE_WEEK_OFFSET, offset);
  });
};

export const getPrevWeekTemps = (store) => {
  var offset = store.state.week.weekOffset - 1;
  var startDate = moment().startOf('week').add(7 * offset, 'days').toDate();
  var endDate = moment().endOf('week').add(7 * offset, 'days').toDate();

  API.Temperature.getTempsByDateRange(startDate, endDate).then(results => {
    store.dispatch(
      RECEIVE_WEEK_DATA,
      results.map(function (result) {
        return assembleTempObjFromResultObj(result);
      })
    );

    store.dispatch(UPDATE_WEEK_OFFSET, offset);
  });
};
