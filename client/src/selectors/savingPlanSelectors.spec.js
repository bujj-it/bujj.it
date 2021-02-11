import {savingsPerMonthSelector, spendingPerWeekSelector, timeToGoalSelector} from './savingPlanSelectors.js'

// money values in pennies

let testState

beforeEach(() => {
  testState = {
    income: 10000,
    savingPercentage: 10,
    savingGoal: {
      name: 'saving goal one',
      value: 20000
    },
    expenses: {
      expenseIdOne: {
        name: 'expense one',
        value: 5000
      }
    }
  }
})

describe('savingsPerMonthSelector', () => {
  it('returns savings value', () => {
    expect(savingsPerMonthSelector(testState)).toBe(1000)
  })
})

describe('spendingPerWeekSelector', () => {
  it('positive integers', () => {
    expect(spendingPerWeekSelector(testState)).toBe(920)
  })

  it('negative outcome', () => {
    testState.income = 4000
    expect(spendingPerWeekSelector(testState)).toBe(-323)
  })
})

describe('timeToGoalSelector', () => {
  it('months only', () => {
    expect(timeToGoalSelector(testState)).toMatchObject({months: 20, days: 0})
  })
  it('days and months', () => {
    testState.savingGoal.value = 12500
    expect(timeToGoalSelector(testState)).toMatchObject({months: 12, days: 15})
  })
})