import moment from 'moment'

export function YYYY_MM_DD (date) {
  return moment(date).format('YYYY-MM-DD')
}

export function formatTemperature (value) {
  return (value * 1).toFixed(1)
}
