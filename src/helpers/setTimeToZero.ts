const setDateToZero = (date: Date): Date => {
  date.setUTCHours(24)
  date.setUTCMinutes(0)
  date.setUTCSeconds(0)
  date.setUTCMilliseconds(0)
  return date
}

export default setDateToZero
