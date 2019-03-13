export const setDrivesToStorage = drives => {
  return {
    type: 'SET_DRIVES',
    payload: {
      drives
    }
  };
}

export const resetDrives = () => {
  return {
    type: 'RESET_DRIVES'
  };
}