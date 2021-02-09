import {savingsPerMonthHelper, spendingPerWeekHelper, timeToGoalHelper} from './savingGoalHelpers.js'


describe('savingsPerMonthHelper', () => {
  it('integers', () => {
    const tenPounds = 1000
    const savingPercentage = 10
    const expectOnePound = 100
    expect(savingsPerMonthHelper(tenPounds, savingPercentage)).toBe(expectOnePound)
  })
})

describe('spendingPerWeekHelper', () => {
  it('positive integers', () => {
    const remainingPerMonth = 100
    const savingsPerMonth = 60
    expect(spendingPerWeekHelper(remainingPerMonth, savingsPerMonth)).toBe(9)
  })

  it('negative outcome', () => {
    const remainingPerMonth = 100
    const savingsPerMonth = 110
    expect(spendingPerWeekHelper(remainingPerMonth, savingsPerMonth)).toBe(-3)
  })
})

describe('timeToGoalHelper', () => {
  it('returns 2 whole months to target', () => {
    const savingGoal = 1000
    const savingAmount = 500
    expect(timeToGoalHelper(savingGoal, savingAmount)).toMatchObject({months: 2, days: 0})
  })
  it('returns 2 months 15 days to target', () => {
    const savingGoal = 1250
    const savingAmount = 500
    expect(timeToGoalHelper(savingGoal, savingAmount)).toMatchObject({months: 2, days: 15})
  })
  it('returns 6 months 20 days to target', () => {
    const savingGoal4k = 400000 
    const savingAmount600 = 60000
    expect(timeToGoalHelper(savingGoal4k, savingAmount600)).toMatchObject({months: 6, days: 20})
  })
})