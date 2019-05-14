const initialState = {
  drives: {},
};

const driveReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DRIVES':
      return {
        drives: action.payload.drives,
      };
    case 'RESET_DRIVES':
      return {
        drives: {},
      };
    default:
      return state;
  }
};

export default driveReducer;
