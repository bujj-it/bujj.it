export const isInputCompleteSelector = (state, inputField) => {
  const currentInputState = state[inputField]
  if (typeof currentInputState !== 'object' || !currentInputState) {
    return !!currentInputState
  } 
  for (const value of Object.values(currentInputState)) {
    if (!value) {
      return false
    }
  }
  return true
}