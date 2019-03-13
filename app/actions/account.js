export const setAccountName = name => {
  return {
    type: 'SET_ACCOUNT_NAME',
    payload: {
      name
    }
  };
}

export const setAddress = address => {
  return {
    type: 'SET_ADDRESS',
    payload: {
      address
    }
  };
}

export const setPrivateKeys = keys => {
  return {
    type: 'SET_PRIVATE_KEYS',
    payload: {
      keys
    }
  };
}

export const setPublicKeys = keys => {
  return {
    type: 'SET_PUBLIC_KEYS',
    payload: {
      keys
    }
  };
}

export const setGeneratedFlag = flag => {
  return {
    type: 'SET_GENERATED_FLAG',
    payload: {
      flag
    }
  };
}

export const setTransactions = transactions => {
  return {
    type: 'SET_TRANSACTIONS',
    payload: {
      transactions
    }
  };
}

export const setTransactionToSign = (transaction, checked) => {
  return {
    type: 'SET_TRANSACTIONS_TO_SIGN',
    payload: {
      transaction,
      checked
    }
  };
}

export const resetAccount = () => {
  return {
    type: 'RESET'
  };
}