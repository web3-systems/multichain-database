import Dexie from 'dexie';

import { AccountMeta } from './types';

/**
 * @class MultiChainMetaDatabase
 * @description A class for managing browser IndexedDB database of Web3 Entities cross-chain metadata.
 */
class MultiChainMetaDatabase extends Dexie {
  accounts!: Dexie.Table<AccountMeta, string>;
  constructor() {
    super(`meta-evm`);
    this.version(1).stores({
      accounts: '&address, chainBase, chainsActive, chains',
      compute: '++id, name',
    });
  }
}

export default MultiChainMetaDatabase;
