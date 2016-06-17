import API from 'api';
import { assembleTempObjFromResultObj } from './utils.js';
import {
  RECEIVE_TODAY_DATA,
  UPDATE_TODAY_DATA
} from '../mutation-types.js';

export const getTodayTemp = (store) => {
  API.Temperature.getTodayTemp().then(result => {
    store.dispatch(RECEIVE_TODAY_DATA, assembleTempObjFromResultObj(result));
  });
};

export const createTodayTemp = (store, temp) => {
  API.Temperature.createTemp(temp).then(result => {
    store.dispatch(RECEIVE_TODAY_DATA, assembleTempObjFromResultObj(result));
  });
};

export const updateTodayTemp = (store, temperature, period) => {
  API.Temperature.updateTemp({
    id: store.state.today.temp.id,
    temperature: temperature,
    period: period
  }).then(result => {
    store.dispatch(UPDATE_TODAY_DATA, assembleTempObjFromResultObj(result));
  });
};
