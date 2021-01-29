export const isInputCompleteSelector = (inputField, state) => {
  const currentInputState = state[inputField]
  for (const [key, value] of Object.entries(currentInputState)) {
    if (!value) {
      return false
    }
  }
  return true
}