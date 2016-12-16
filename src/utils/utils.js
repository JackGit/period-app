import moment from 'moment'

export function enrichTemperatureRecords (temperatureRecords, startDate, totalDays) {
  var records = []
  for (let i = 0; i < totalDays; i++) {
    let date = moment(startDate).add(i, 'days').toDate()
    let record = temperatureRecords.filter(r => moment(r.date).isSame(date, 'day'))[0]

    if (record) {
      records.push({
        id: record.id,
        temperature: record.temperature,
        period: record.period,
        date: record.date,
        dateString: record.dateString,
        updatedAt: record.updateAt
      })
    } else {
      records.push({
        id: null,
        temperature: null,
        period: false,
        date: date,
        dateString: moment(date).format('YYYY MM DD'),
        updatedAt: null
      })
    }
  }

  return records
}
