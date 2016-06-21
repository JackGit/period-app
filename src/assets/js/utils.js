import moment from 'moment';

const DATE_FORMAT = 'YYYY MM DD';

export const assembleTempObjFromResultObj = (result) => {
  return {
    id: result.id,
    temperature: result.get('temperature'),
    period: result.get('period'),
    date: result.get('date'),
    dateString: result.get('dateString') // '2016 06 20'
  };
};

export const getDaysInMonth = (date) => {
  var dates = [];
  var numOfDays = moment(date).daysInMonth();

  for (var i = 0; i < numOfDays; i++) {
    dates.push(moment(date).startOf('month').add(i, 'days').toDate());
  }

  return dates;
};

export const getDaysInWeek = (date) => {
  var dates = [];

  for (var i = 0; i < 7; i++) {
    dates.push(moment(date).startOf('week').add(i, 'days').toDate());
  }

  return dates;
};

export const fillWeekTempData = (startDate, temps) => {
  var dateStrings = getDaysInWeek(startDate).map((date) => {
    return moment(date).format(DATE_FORMAT);
  });

  return dateStrings.map((dateString) => {
    var record = temps.filter((temp) => {
      return temp.dateString === dateString;
    })[0];

    if (record) {
      return {
        date: record.date,
        temperature: record.temperature,
        period: record.period
      };
    } else {
      return {
        date: moment(dateString, DATE_FORMAT).toDate(),
        temperature: null,
        period: null
      };
    }
  });
};

export const fillMonthTempData = (startDate, temps) => {
  var dateStrings = getDaysInMonth(startDate).map((date) => {
    return moment(date).format(DATE_FORMAT);
  });

  return dateStrings.map((dateString) => {
    var record = temps.filter((temp) => {
      return temp.dateString === dateString;
    })[0];

    if (record) {
      return {
        date: record.date,
        temperature: record.temperature,
        period: record.period
      };
    } else {
      return {
        date: moment(dateString, DATE_FORMAT).toDate(),
        temperature: null,
        period: null
      };
    }
  });
};
