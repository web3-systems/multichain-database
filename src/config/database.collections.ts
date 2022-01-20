export const transaction = {
  name: 'transactions',
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

export const contracts = {
  name: 'contracts',
  options: {
    unique: ['address'],
    indices: ['address', 'blockNumber', 'from', 'to'],
    exact: [
      'address',
      'blockNumber',
      'from',
      'to',
      'abi',
      'bytecode',
      'timestamp',
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

export const defaultCollections = [transaction, receipts, contracts, logs];

export default defaultCollections;
