import * as AV from 'avoscloud-sdk'
import moment from 'moment'

const Temperature = AV.Object.extend('Temperature')
const DATE_FORMAT = 'YYYY MM DD'

export function createTemp (temp) {
  let tempAVObj = new Temperature()
  tempAVObj.set('userId', 'jack')
  tempAVObj.set('temperature', temp.temperature)
  tempAVObj.set('period', temp.period)
  tempAVObj.set('date', temp.date)
  tempAVObj.set('dateString', moment(temp.date).format(DATE_FORMAT))
  return tempAVObj.save()
}

export function getTemp (id) {
  let tempQueryObj = new AV.Query('Temperature')
  return tempQueryObj.get(id)
}

export function getTodayTemp () {
  let tempQueryObj = new AV.Query('Temperature')
  tempQueryObj.equalTo('userId', 'jack')
  tempQueryObj.equalTo('dateString', moment(new Date()).format(DATE_FORMAT))
  return tempQueryObj.first()
}

export function getTempByDate (date) {
  let tempQueryObj = new AV.Query('Temperature')
  tempQueryObj.equalTo('userId', 'jack')
  tempQueryObj.equalTo('dateString', moment(date).format(DATE_FORMAT))
  return tempQueryObj.first()
}

export function getTempsByDateRange (startDate, endDate) {
  let tempQueryObj = new AV.Query('Temperature')
  tempQueryObj.equalTo('userId', 'jack')
  tempQueryObj.greaterThanOrEqualTo('date', startDate)
  tempQueryObj.lessThanOrEqualTo('date', endDate)
  tempQueryObj.addAscending('date')
  return tempQueryObj.find()
}

export function getTheFirstTempData () {
  let tempQueryObj = new AV.Query('Temperature')
  tempQueryObj.equalTo('userId', 'jack')
  tempQueryObj.addAscending('date')
  return tempQueryObj.first()
}

export function updateTemp (temp) {
  return getTemp(temp.id).try((tempAVObj) => {
    tempAVObj.set('period', temp.period)
    tempAVObj.set('temperature', temp.temperature)
    return tempAVObj.save()
  })
}

export function deleteTemp (id) {
  let tempQueryObj = AV.Object.createWithoutData('Temperature', id)
  return tempQueryObj.destroy()
}
