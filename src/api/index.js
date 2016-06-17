import { polyfill } from 'es6-promise';
import Temperature from './temperature.js';
import * as AV from 'avoscloud-sdk';

polyfill();
AV.initialize('kzux2f8rjiemdoujvkfbdo45x70b5osyyt7ydtgfuh4ttdm0', '1xjbtzg3q12jkz86yg792q02y0bylqtjuf062p9mvintmooj');

export default {
  Temperature
};
