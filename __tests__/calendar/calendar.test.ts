import {
    areEqual,
    qt,
    isLeapYear,
    getDaysInMonth,
    getDayOfWeek,
    getMonthData,
  } from '../../src/components/Calendar/calendar'
  
  describe('Calendar logic test', () => {
    it('AreEqual undefined params', () => {
      const dayOne = new Date()
      const dayTwo = undefined
      expect(areEqual(dayOne, dayTwo)).toBe(false)
      expect(areEqual(dayTwo, dayTwo)).toBe(false)
      expect(areEqual(dayTwo, dayOne)).toBe(false)
    })
  
    it('AreEqual equal date', () => {
      const dayOne = new Date()
      expect(areEqual(dayOne, dayOne)).toBe(true)
    })
  
    it('AreEqual dont equal date', () => {
      const dayOne = new Date(2021, 4, 15)
      const dayTwo = new Date(2021, 4, 16)
      expect(areEqual(dayOne, dayTwo)).toBe(false)
    })
  
    it('Qt undefined params', () => {
      const dayOne = new Date()
      const dayTwo = undefined
      expect(qt(dayOne, dayTwo)).toBe(false)
      expect(qt(dayTwo, dayTwo)).toBe(false)
      expect(qt(dayTwo, dayOne)).toBe(false)
    })
  
    it('Qt equal date', () => {
      const dayOne = new Date()
      expect(qt(dayOne, dayOne)).toBe(false)
    })
  
    it('Qt dont equal date', () => {
      const dayOne = new Date(2021, 4, 15)
      const dayTwo = new Date(2021, 4, 16)
      expect(qt(dayOne, dayTwo)).toBe(false)
      expect(qt(dayTwo, dayOne)).toBe(true)
    })
  
    it('Leap year', () => {
      expect(isLeapYear(2000)).toBe(true)
      expect(isLeapYear(2004)).toBe(true)
      expect(isLeapYear(2001)).toBe(false)
      expect(isLeapYear(1999)).toBe(false)
    })
  
    it('Get february day', () => {
      const day = new Date(2021, 1, 1)
      expect(getDaysInMonth(day)).toBe(28)
      const dayLeapYear = new Date(2020, 1, 1)
      expect(getDaysInMonth(dayLeapYear)).toBe(29)
    })
  
    it('Get february day', () => {
      const day = new Date(2021, 1, 1)
      expect(getDaysInMonth(day)).toBe(28)
      const dayLeapYear = new Date(2020, 1, 1)
      expect(getDaysInMonth(dayLeapYear)).toBe(29)
    })
  
    it('Get day of week', () => {
      const day = new Date(2021, 0, 1)
      expect(getDayOfWeek(day)).toBe(5)
      expect(getDayOfWeek(day, 'Mo')).toBe(4)
    })
  
    it('Get month data Europe', () => {
      const data = getMonthData(2021, 0, 'Su')
      expect(data[0][0]!.getTime()).toBe(new Date(2020, 11, 27).getTime())
      expect(data[0][5]!.getTime()).toBe(new Date(2021, 0, 1).getTime())
      expect(data[5][6]!.getTime()).toBe(new Date(2021, 1, 6).getTime())
    })
  
    it('Get month data Russia', () => {
      const data = getMonthData(2021, 0, 'Mo')
      expect(data[0][0]!.getTime()).toBe(new Date(2020, 11, 28).getTime())
      expect(data[0][4]!.getTime()).toBe(new Date(2021, 0, 1).getTime())
      expect(data[5][6]!.getTime()).toBe(new Date(2021, 1, 7).getTime())
    })
  })