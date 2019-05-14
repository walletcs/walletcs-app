export const setAccountName = name => ({
  type: 'SET_ACCOUNT_NAME',
  payload: {
    name,
  },
});

export const setAddress = (address, network) => ({
  type: 'SET_ADDRESS',
  payload: {
    address,
    network,
  },
});

export const setPrivateKeys = keys => ({
  type: 'SET_PRIVATE_KEYS',
  payload: {
    keys,
  },
});

export const setPublicKeys = keys => ({
  type: 'SET_PUBLIC_KEYS',
  payload: {
    keys,
  },
});

export const setGeneratedFlag = flag => ({
  type: 'SET_GENERATED_FLAG',
  payload: {
    flag,
  },
});

export const setTransactions = transactions => ({
  type: 'SET_TRANSACTIONS',
  payload: {
    transactions,
  },
});

export const setRawTransactions = rawTransactions => ({
  type: 'SET_RAW_TRANSACTIONS',
  payload: {
    rawTransactions,
  },
});

export const setTransactionToSign = (transaction, checked) => ({
  type: 'SET_TRANSACTIONS_TO_SIGN',
  payload: {
    transaction,
    checked,
  },
});

export const resetAccount = () => ({
  type: 'RESET',
});
