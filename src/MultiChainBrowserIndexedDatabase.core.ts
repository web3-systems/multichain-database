import { FilterByBlockHash } from '@ethersproject/abstract-provider';
import { Log, TransactionRequest } from '@ethersproject/providers';
import Dexie from 'dexie/dist/dexie.js';

import { Account, Contracts, TransactionAndReceipt } from './types';

/**
 * @class MultiChainBrowserIndexedDatabase
 * @description A class for managing browser IndexedDB database of Web3 Entities (used in sets)
 */
class MultiChainBrowserIndexedDatabase extends Dexie {
  accounts!: Dexie.Table<Account, string>;
  contracts!: Dexie.Table<Contracts, string>;
  eventFilters!: Dexie.Table<FilterByBlockHash, string>;
  logs!: Dexie.Table<Log, string>;
  transactionRequests!: Dexie.Table<TransactionRequest, string>;
  transactions!: Dexie.Table<TransactionAndReceipt, string>;

  /**
   * @description Constructor for the MultiChainBrowserIndexedDatabase class that extends Dexie.
   *              Initializes the database with the name 'evm' and the following tables:
   *              accounts, contracts, eventFilters, logs, transactionRequests, transactions,
   * @param {number} chainId The chainId of the database.
   */
  constructor(chainId: number) {
    super(`evm-${chainId}`);
    this.version(1).stores({
      accounts: '&address, chainId, nonce, inbound, balance, keywords',
      contracts: '&address, chainId, blockNumber, from, timestamp, keywords',
      eventFilters: '++id, address, topics',
      logs:
        '++id, blockHash, transactionIndex, logIndex, address, topics, data, removed',
      transactionRequests:
        '++id, from, nonce, gasLimit, gasPrice, data, value, chainId, type, accessList, maxPriorityFeePerGas, maxFeePerGas',
      transactions:
        '&hash, to, from, chainId, value, nonce, gasLimit, gasPrice, data, type, maxPriorityFeePerGas, maxFeePerGas',
    });
  }
}

export default MultiChainBrowserIndexedDatabase;
