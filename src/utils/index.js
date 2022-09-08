import moment from "moment";

export const minDateMaxDate = {
    minDate: moment('1987-03-29'),
    maxDate: moment('2027-01-01')
}

export const isCurrentDay = (day) => moment().isSame(day, 'day');
export const isSelectedMonth = (day, today) => today.isSame(day, 'month');
export const isSelectedDay = (day, today) => moment(day).isSame(today, 'day');
export const isDayContainCurrentEvent = (event, dayItem) =>
    event.date >= dayItem.startOf('day').format('X')
    && event.date <= dayItem.clone().endOf('day').format('X');
