import API from 'api';
import {
  UPDATE_EDIT_SHOW,
  UPDATE_EDIT_PAGE_TEMPERATURE,
  UPDATE_EDIT_PAGE_PERIOD
} from '../mutation-types.js';

export const showEditPage = (store) => {
  store.dispatch(UPDATE_EDIT_SHOW, true);
};

export const hideEditPage = (store) => {
  store.dispatch(UPDATE_EDIT_SHOW, false);
};

export const updateTemperature = (store, temp) => {
  store.dispatch(UPDATE_EDIT_PAGE_TEMPERATURE, temp);
};

export const updatePeriod = (store, period) => {
  store.dispatch(UPDATE_EDIT_PAGE_PERIOD, period);
};

export const submit = (store) => {

};