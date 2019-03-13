// const initialState = {
//   name: '',
//   address: null,
//   keys: []
// };

const initialState = {
  name: '',
  address: null,
  keys: [
    {
      privateKey: '0x2fb2b48e0a4c08325202de3ccdb15255234b5350dec160d6f0b5e9d98dbc104f',
      found: true,
      account: '333'
    }
  ],
  transactions: [
    {
      transaction: {
        pub_key: '0x0533F664f9f3aF4deF686043c4a74B5340923C77',
        transactions: [
          {
            contract: '0xb02f40D566Cb2Ed27260e6b7F5C55a7b0f85aCA7',
            transaction: {
              gasPrice: '1000000000',
              gasLimit: 21000,
              nonce: 28,
              data: '0xa9059cbb00000000000000000000000074930ad53ae8e4cfbc3fd3fe36920a3ba54dd7e3000000000000000000000000000000000000000000000000000000000000000c',
              to: '0xb02f40D566Cb2Ed27260e6b7F5C55a7b0f85aCA7'
            }
          }
        ],
      },
      file: 'tr-22.json'
    }
  ]
}

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT_NAME':
      return {
        ...state,
        name: action.payload.name
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.payload.address
      }
    case 'SET_PRIVATE_KEYS':
      return {
        ...state,
        keys: action.payload.keys
      }
    case 'SET_PUBLIC_KEYS':
      return {
        ...state,
        publicKeys: action.payload.keys
      }
    case 'SET_GENERATED_FLAG':
      return {
        ...state,
        generatedFlag: action.payload.flag
      }
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload.transactions
      }
    default:
      return state
  }
};
