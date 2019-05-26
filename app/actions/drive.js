export const setDrivesToStorage = drives => ({
  type: 'CHECK_DRIVES',
  payload: {
    drives,
  },
});

export const resetDrives = () => ({
  type: 'RESET_DRIVES',
});
