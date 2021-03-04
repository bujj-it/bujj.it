export const isInputCompleteSelector = (state, inputField) => {
  const currentInputState = state[inputField];
  if (typeof currentInputState !== 'object' || !currentInputState) {
    return !!currentInputState;
  }
  return Object.values(currentInputState).every(value => !!value);
};
