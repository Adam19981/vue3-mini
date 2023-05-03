export interface CalendarItem {
  label: string
  date: number
  timeStamp: number
}

export interface DateInfo {
  year: number
  month: number
  day: number
  timeStamp: number
  date: string
}

export function getDateTimeStampZero() {
  return new Date(new Date().toLocaleDateString()).getTime()
}

export function getNowDateInfo(timeStamp?: number): DateInfo {
  const date = timeStamp ? new Date(timeStamp) : new Date()
  const req = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    timeStamp: date.getTime()
  }
  return {
    ...req,
    date: `${req.year}-${req.month}-${req.day}`
  }
}

export function getDay(timeStamp: number) {
  const weeks = ['日', '一', '二', '三', '四', '五', '六']
  const day = new Date(timeStamp).getDay()
  return weeks[day]
}

function getDateByTimeStamp(timeStamp: number) {
  return new Date(timeStamp).getDate()
}

export function getWeek(param: DateInfo): CalendarItem[] {
  const nowDate = new Date(param.date)
  const nowTimeStamp = nowDate.getTime()
  const day = nowDate.getDay()
  const oneDayTimeStamp = 24 * 60 * 60 * 1000
  const startTimeStamp = nowTimeStamp - (day ? day - 1 : 6) * oneDayTimeStamp // 本周第一天时间戳
  const list: CalendarItem[] = []

  for (let i = 0; i < 7; i++) {
    list.push({
      label: getDay(startTimeStamp + i * oneDayTimeStamp),
      date: getDateByTimeStamp(startTimeStamp + i * oneDayTimeStamp),
      timeStamp: startTimeStamp + i * oneDayTimeStamp
    })
  }

  return list
}

export function getMonth(param: DateInfo): CalendarItem[] {
  const startTimeStamp = new Date(param.date).setDate(1)

  const day = new Date(startTimeStamp).getDay() || 7

  const nowDate = new Date(param.date)
  const monthDays = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth() + 1,
    0
  ).getDate()
  const oneDayTimeStamp = 24 * 60 * 60 * 1000

  const list: CalendarItem[] = []

  for (let i = 1; i <= 42; i++) {
    if (i >= day && i < monthDays + day) {
      const inx = i - day
      list.push({
        label: getDay(startTimeStamp + inx * oneDayTimeStamp),
        date: getDateByTimeStamp(startTimeStamp + inx * oneDayTimeStamp),
        timeStamp: startTimeStamp + inx * oneDayTimeStamp
      })
    } else {
      list.push({ label: '', date: 0, timeStamp: 0 })
    }
  }

  return list
}
