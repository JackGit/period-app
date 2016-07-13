import {
    UPDATE_EDIT_PAGE_TEMPERATURE,
    UPDATE_EDIT_PAGE_PERIOD,
    UPDATE_EDIT_SHOW
} from '../mutation-types.js';

const state = {
    show: false,
    id: '',
    temp: '',
    period: false
};

const mutations = {
    [UPDATE_EDIT_PAGE_TEMPERATURE]: (state, temp) => {
        state.temp = temp;
    },
    [UPDATE_EDIT_PAGE_PERIOD]: (state, period) => {
        state.period = period;
    },
    [UPDATE_EDIT_SHOW]: (state, show) => {
        state.show = show;
    }
};

export default {
    state,
    mutations
};
