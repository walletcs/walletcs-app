const initialState = {
  drives: [],
};

const driveReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_DRIVES':
      return {
        ...state,
        drives: action.payload.drives,
      };
    case 'RESET_DRIVES':
      return {
        ...state,
        drives: [],
      };
    case 'SET_ACTIVE_DRIVE':
      return {
        ...state,
        activeDrive: {
          path: action.payload.path,
        },
      };
    case 'RESET_ACTIVE_DRIVE':
      return {
        ...state,
        activeDrive: null,
      };
    default:
      return state;
  }
};

export default driveReducer;
