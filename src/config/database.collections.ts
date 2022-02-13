export const transactions = {
  name: 'transactions',
  options: {
    unique: ['hash'],
    indices: ['hash', 'blockNumber', 'from', 'to'],
    exact: [
      'hash',
      'to',
      'from',
      'nonce',
      'blockNumber',
      'blockHash',
      'timestamp',
      'confirmations',
      'gasLimit',
      'gasPrice',
      'data',
      'value',
      'chainId',
      'r',
      's',
      'v',
      'type',
      'accessList',
      'maxPriorityFeePerGas',
      'maxFeePerGas',
    ],
  },
};

export const receipts = {
  name: 'receipts',
  options: {
    unique: ['hash'],
    indices: ['hash', 'blockNumber', 'from', 'to'],
    exact: [
      'hash',
      'blockNumber',
      'timeStamp',
      'hash',
      'nonce',
      'blockHash',
      'transactionIndex',
      'from',
      'to',
      'value',
      'gas',
      'gasPrice',
      'isError',
      'txreceipt_status',
      'input',
      'contractAddress',
      'cumulativeGasUsed',
      'gasUsed',
      'confirmations',
    ],
  },
};

export const logs = {
  name: 'logs',
  options: {
    indices: ['address', 'blockNumber', 'from', 'to'],
    exact: ['address', 'blockNumber', 'name', 'arguments'],
  },
};

export const transactionsScanner = {
  name: 'transactionsScanner',
  options: {
    unique: ['hash'],
    indices: ['hash', 'blockNumber', 'from', 'to'],
    exact: [
      'hash',
      'blockNumber',
      'timeStamp',
      'hash',
      'nonce',
      'blockHash',
      'transactionIndex',
      'from',
      'to',
      'value',
      'gas',
      'gasPrice',
      'isError',
      'txreceipt_status',
      'input',
      'contractAddress',
      'cumulativeGasUsed',
      'gasUsed',
      'confirmations',
    ],
  },
};

export const accounts = {
  name: 'accounts',
  options: {
    unique: ['address'],
    indices: ['address'],
    exact: ['address', 'chainsAcitve', 'chains'],
  },
};

export const contracts = {
  name: 'contracts',
  options: {
    unique: ['address'],
    indices: ['address', 'blockNumber', 'from', 'to'],
    exact: [
      'chainId',
      'from',
      'blockNumber',
      'timestamp',
      'address',
      'bytecode',
      'abi',
      'name',
      'meta',
    ],
  },
};

export const defaultCollections = [
  transactions,
  transactionsScanner,
  receipts,
  contracts,
  logs,
  accounts,
];

export default defaultCollections;
