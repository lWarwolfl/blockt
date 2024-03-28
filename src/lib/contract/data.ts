export const VendingmachineAddress = '0xC8be6E33495f7FeBd224d38782BFB526642cCf9C'

export const vendingMachineABI = [
   {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
   },
   {
      inputs: [
         {
            internalType: 'address',
            name: '',
            type: 'address',
         },
      ],
      name: 'donutBalances',
      outputs: [
         {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [],
      name: 'getBalance',
      outputs: [
         {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [],
      name: 'getVendingMachineBalance',
      outputs: [
         {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [],
      name: 'owner',
      outputs: [
         {
            internalType: 'address',
            name: '',
            type: 'address',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [
         {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
         },
      ],
      name: 'purchase',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
   },
   {
      inputs: [
         {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
         },
      ],
      name: 'restock',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
   },
   {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
   },
]
