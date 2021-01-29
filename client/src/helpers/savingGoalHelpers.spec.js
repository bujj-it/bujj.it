import {savingsPerMonth, spendingPerWeek, monthsToGoal} from './savingGoalHelpers.js'


describe('savingsPerMonth', () => {
  it('integers', () => {
    const tenPounds = 1000
    const savingPercentage = 10
    const expectOnePound = 100
    expect(savingsPerMonth(tenPounds, savingPercentage)).toBe(expectOnePound)
  })
})

describe('spendingPerWeek', () => {
  it('positive integers', () => {
    const remainingPerMonth = 100
    const savingsPerMonth = 60
    expect(spendingPerWeek(remainingPerMonth, savingsPerMonth)).toBe(40)
  })

  it('negative outcome', () => {
    const remainingPerMonth = 100
    const savingsPerMonth = 110
    expect(spendingPerWeek(remainingPerMonth, savingsPerMonth)).toBe(-10)
  })
})

describe('monthsToGoal', () => {
  it('returns 2 whole months to target', () => {
    const savingGoal = 1000
    const savingAmount = 500
    expect(monthsToGoal(savingGoal, savingAmount)).toMatchObject({months: 2, days: 0})
  })
  it('returns 2 months 15 days to target', () => {
    const savingGoal = 1250
    const savingAmount = 500
    expect(monthsToGoal(savingGoal, savingAmount)).toMatchObject({months: 2, days: 15})
  })
  it('returns 6 months 20 days to target', () => {
    const savingGoal4k = 400000 
    const savingAmount600 = 60000
    expect(monthsToGoal(savingGoal4k, savingAmount600)).toMatchObject({months: 6, days: 20})
  })
})