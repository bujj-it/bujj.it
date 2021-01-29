export const isInputCompleteSelector = (inputField, state) => {
  const currentInputState = state[inputField]
  for (const value of Object.values(currentInputState)) {
    if (!value) {
      return false
    }
  }
  return true
}