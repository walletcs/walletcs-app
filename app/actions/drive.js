export const setDrivesToStorage = drives => ({
  type: 'SET_DRIVES',
  payload: {
    drives
  }
});

export const resetDrives = () => ({
  type: 'RESET_DRIVES'
});
