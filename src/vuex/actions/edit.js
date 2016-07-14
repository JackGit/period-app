import API from 'api';
// import { assembleTempObjFromResultObj } from 'assets/js/utils.js';
import {
  UPDATE_EDIT_PAGE_TEMPERATURE,
  UPDATE_EDIT_PAGE_PERIOD,
  UPDATE_EDIT_PAGE_DATE
} from '../mutation-types.js';

export const updateTemperature = (store, temp) => {
  store.dispatch(UPDATE_EDIT_PAGE_TEMPERATURE, temp);
};

export const updatePeriod = (store, period) => {
  store.dispatch(UPDATE_EDIT_PAGE_PERIOD, period);
};

export const updateDate = (store, date) => {
  store.dispatch(UPDATE_EDIT_PAGE_DATE, date);
};

export const createTemp = (store, temp, callback) => {
  API.Temperature.createTemp(temp).then(result => {
    // store.dispatch(RECEIVE_TODAY_DATA, assembleTempObjFromResultObj(result));
    callback && callback();
  });
};

export const updateTemp = (store, id, temperature, period, callback) => {
  API.Temperature.updateTemp({
    id: id,
    temperature: temperature,
    period: period
  }).then(result => {
    // store.dispatch(UPDATE_TODAY_DATA, assembleTempObjFromResultObj(result));
    callback && callback();
  });
};
