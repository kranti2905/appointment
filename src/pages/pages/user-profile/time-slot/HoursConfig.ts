export const weekDays: string[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

export const dayType: string[] = [
  'Hours', 'Days'
]

export interface week {
  Monday: boolean,
  Tuesday: boolean,
  Wednesday: boolean,
  Thursday: boolean,
  Friday: boolean,
  Saturday: boolean,
  Sunday: boolean,
}

export const initialDaysOnStateValue = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
  Sunday: false,
}

export interface HourConfiguration {
  day: Day,
  status: boolean,
  config: OpenCloseConfig
}

export type Day = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

export interface OpenCloseConfig {
  open: string,
  close: string,
  toggleOpen: boolean,
  toggleClose: boolean
}

const days: Day[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const timeConfig: OpenCloseConfig = {
open: '12:00 PM',
close: '11:59 PM',
toggleOpen: false,
toggleClose: false
}

export function getDefaultHoursConfig() {
let hoursConfiguration: HourConfiguration[] = []
for (let day of days) {
  hoursConfiguration.push({
    day,
    status: false,
    config: timeConfig
  })
}

return hoursConfiguration
}
