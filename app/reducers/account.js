/* eslint-disable no-case-declarations */
const initialState = {
  name: '',
  address: null,
  network: null,
  keys: [],
  transactions: [],
  transactionsToSign: [],
  rawTransactions: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT_NAME':
      return {
        ...state,
        name: action.payload.name,
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.payload.address,
        network: action.payload.network,
      };
    case 'SET_PRIVATE_KEYS':
      return {
        ...state,
        keys: action.payload.keys,
      };
    case 'SET_PUBLIC_KEYS':
      return {
        ...state,
        publicKeys: action.payload.keys,
      };
    case 'SET_GENERATED_FLAG':
      return {
        ...state,
        generatedFlag: action.payload.flag,
      };
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload.transactions,
      };
    case 'SET_RAW_TRANSACTIONS':
      return {
        ...state,
        rawTransactions: action.payload.rawTransactions,
      };
    case 'SET_TRANSACTIONS_TO_SIGN':
      let transactionsToSign = state.transactionsToSign.slice(0);

      if (action.payload.checked) {
        transactionsToSign.push(action.payload.transaction);
      } else {
        transactionsToSign = transactionsToSign.filter(t => t !== action.payload.transaction);
      }

      return {
        ...state,
        transactionsToSign,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default accountReducer;
