const stateKey = 'graph-editor-state'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(stateKey)
    return serializedState !== null 
      ? JSON.parse(serializedState)
      : undefined
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(stateKey, serializedState)
  } catch (err) {
    // Ignore errors.
  }
}