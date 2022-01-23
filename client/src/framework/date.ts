import dayjs, { Dayjs } from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)

export const filterDate = (ts: string) => {
  return ts.split('T')[0]
}

export const filterTime = (ts: string) => {
  return ts.substring(ts.indexOf('T') + 1, ts.lastIndexOf('.'))
}

export const formatDayJStoTime = (time: dayjs.Dayjs) => time.subtract(2, 'hours').format('HH:mm:ss')

export const isSameOrBeforeFunc = (compared: Dayjs, comparison: Dayjs) =>
  comparison.isSameOrBefore(compared)
