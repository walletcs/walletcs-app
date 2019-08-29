export const setDrivesToStorage = drives => ({
  type: 'CHECK_DRIVES',
  payload: {
    drives,
  },
});

export const resetDrives = () => ({
  type: 'RESET_DRIVES',
});

export const setActiveDrive = path => ({
  type: 'SET_ACTIVE_DRIVE',
  payload: {
    path,
  },
});

export const resetActiveDrive = () => ({
  type: 'RESET_ACTIVE_DRIVE',
});
