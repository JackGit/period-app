import * as AV from 'avoscloud-sdk';
import moment from 'moment';

const Temperature = AV.Object.extend('Temperature');
const DATE_FORMAT = 'YYYY MM DD';

// create
function createTemp (temp) {
  let tempAVObj = new Temperature();
  // let user = AV.User.current();

  tempAVObj.set('userId', 'jack');
  tempAVObj.set('temperature', temp.temperature);
  tempAVObj.set('period', temp.period);
  tempAVObj.set('date', temp.date);
  tempAVObj.set('dateString', moment(temp.date).format(DATE_FORMAT));

  return tempAVObj.save();
}

function getTemp (id) {
  let tempQueryObj = new AV.Query('Temperature');
  return tempQueryObj.get(id);
}

function getTodayTemp () {
  let tempQueryObj = new AV.Query('Temperature');

  tempQueryObj.equalTo('userId', 'jack');
  tempQueryObj.equalTo('dateString', moment(new Date()).format(DATE_FORMAT));

  return tempQueryObj.first();
}

function getTempByDate (date) {
  let tempQueryObj = new AV.Query('Temperature');

  tempQueryObj.equalTo('userId', 'jack');
  tempQueryObj.equalTo('dateString', moment(date).format(DATE_FORMAT));

  return tempQueryObj.first();
}

function getTempsByDateRange (startDate, endDate) {
  let tempQueryObj = new AV.Query('Temperature');

  tempQueryObj.equalTo('userId', 'jack');
  tempQueryObj.greaterThanOrEqualTo('date', startDate);
  tempQueryObj.lessThanOrEqualTo('date', endDate);
  tempQueryObj.addAscending('date');

  return tempQueryObj.find();
}

function getTheFirstTempData () {
  let tempQueryObj = new AV.Query('Temperature');

  tempQueryObj.equalTo('userId', 'jack');
  tempQueryObj.addAscending('date');

  return tempQueryObj.first();
}

function updateTemp (temp) {
  return getTemp(temp.id).try((tempAVObj) => {
    // tempAVObj.set('userId', temp.userId);
    // tempAVObj.set('date', temp.date);
    tempAVObj.set('period', temp.period);
    tempAVObj.set('temperature', temp.temperature);

    return tempAVObj.save();
  });
}

function deleteTemp (id) {
  let tempQueryObj = new AV.Query('Temperature');
  return tempQueryObj.get(id).destroyAll();
}

export default {
  createTemp,
  getTemp,
  getTempByDate,
  getTodayTemp,
  getTempsByDateRange,
  getTheFirstTempData,
  updateTemp,
  deleteTemp
};
