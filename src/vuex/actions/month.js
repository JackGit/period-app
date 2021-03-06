import API from 'api';
import moment from 'moment';
import { assembleTempObjFromResultObj } from 'assets/js/utils.js';
import {
  RECEIVE_MONTH_DATA,
  UPDATE_MONTH_OFFSET,
  UPDATE_MONTH_OFFSET_MAX,
  UPDATE_MONTH_DATE_BOUNDRY
} from '../mutation-types.js';

export const getMaxMonthOffset = (store) => {
  var thisMonthIndex = moment().month();
  var firstMonthIndex;

  API.Temperature.getTheFirstTempData().then(result => {
    firstMonthIndex = moment(result.get('date')).month();
    store.dispatch(UPDATE_MONTH_OFFSET_MAX, thisMonthIndex - firstMonthIndex);
  });
};

export const getThisMonthTemps = (store) => {
  var startDate = moment().startOf('month').toDate();
  var endDate = moment().endOf('month').toDate();

  API.Temperature.getTempsByDateRange(startDate, endDate).then(results => {
    store.dispatch(
      RECEIVE_MONTH_DATA,
      results.map(function (result) {
        return assembleTempObjFromResultObj(result);
      })
    );

    store.dispatch(UPDATE_MONTH_OFFSET, 0);
    store.dispatch(UPDATE_MONTH_DATE_BOUNDRY, startDate, endDate);
  });
};

export const getNextMonthTemps = (store) => {
  var offset = store.state.month.monthOffset + 1;
  var startDate = moment().startOf('month').add(offset, 'months').toDate();
  var endDate = moment().endOf('month').add(offset, 'months').toDate();

  API.Temperature.getTempsByDateRange(startDate, endDate).then(results => {
    store.dispatch(
      RECEIVE_MONTH_DATA,
      results.map(function (result) {
        return assembleTempObjFromResultObj(result);
      })
    );

    store.dispatch(UPDATE_MONTH_OFFSET, offset);
    store.dispatch(UPDATE_MONTH_DATE_BOUNDRY, startDate, endDate);
  });
};

export const getPrevMonthTemps = (store) => {
  var offset = store.state.month.monthOffset - 1;
  var startDate = moment().startOf('month').add(offset, 'months').toDate();
  var endDate = moment().endOf('month').add(offset, 'months').toDate();

  API.Temperature.getTempsByDateRange(startDate, endDate).then(results => {
    store.dispatch(
      RECEIVE_MONTH_DATA,
      results.map(function (result) {
        return assembleTempObjFromResultObj(result);
      })
    );

    store.dispatch(UPDATE_MONTH_OFFSET, offset);
    store.dispatch(UPDATE_MONTH_DATE_BOUNDRY, startDate, endDate);
  });
};

export const clearMonthTemps = (store) => {
  store.dispatch(RECEIVE_MONTH_DATA, []);
};
