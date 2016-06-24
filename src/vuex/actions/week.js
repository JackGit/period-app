import API from 'api';
import moment from 'moment';
import { assembleTempObjFromResultObj } from 'assets/js/utils.js';
import {
  RECEIVE_WEEK_DATA,
  UPDATE_WEEK_OFFSET,
  UPDATE_WEEK_OFFSET_MAX,
  UPDATE_WEEK_DATE_BOUNDRY
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
    store.dispatch(UPDATE_WEEK_DATE_BOUNDRY, startDate, endDate);
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
    store.dispatch(UPDATE_WEEK_DATE_BOUNDRY, startDate, endDate);
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
    store.dispatch(UPDATE_WEEK_DATE_BOUNDRY, startDate, endDate);
  });
};

export const clearWeekTemps = (store) => {
  store.dispatch(RECEIVE_WEEK_DATA, []);
};
