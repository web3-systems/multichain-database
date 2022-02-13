import MultiChainBrowserIndexedDatabase from './MultiChainBrowserIndexedDatabase.core';

class MultiChainDatabaseClient {
  chainIdDefault: number = 1;
  databases: {
    [key: string]: MultiChainBrowserIndexedDatabase;
  } = {};

  constructor(chainIdDefault?: number) {
    if (chainIdDefault) this.chainIdDefault = chainIdDefault;
    this.createDatabase(this.chainIdDefault);
    return this;
  }

  setChainIdDefault(chainId: number): void {
    this.chainIdDefault = chainId;
  }

  /* -------------------------------------------------------------------------- */
  // DATABASES
  /* -------------------------------------------------------------------------- */

  createDatabase(
    chainId: number,
    onReady?: Function
  ): MultiChainBrowserIndexedDatabase {
    const id = `evm-${chainId}`;
    this.databases[id] = new MultiChainBrowserIndexedDatabase(chainId);
    this.databases[id].on('ready', () => onReady && onReady());
    this.databases[id].open();
    return this.databases[id];
  }

  getDatabase(chainId?: number): MultiChainBrowserIndexedDatabase {
    const id = `evm-${chainId || this.chainIdDefault}`;
    if (!this.databases[id]) {
      this.createDatabase(chainId || this.chainIdDefault, undefined);
    }
    return this.databases[id];
  }

  getTable(table: string, chainId?: number): any {
    const database = this.getDatabase(chainId);
    return database.table(table);
  }

  listTables(chainId?: number): any {
    const database = this.getDatabase(chainId);
    return database.tables;
  }
  /* -------------------------------------------------------------------------- */
  // Tables
  /* -------------------------------------------------------------------------- */

  add(table: string, documents: any, key: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).add(documents, key);
  }

  bulkAdd(table: string, documents: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).bulkAdd(documents);
  }

  bulkAddWithKeys(table: string, documents: any, keys: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).bulkAdd(documents, keys);
  }

  bulkDelete(table: string, keys: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).bulkDelete(keys);
  }

  bulkGet(table: string, keys: Array<any>, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).bulkGet(keys);
  }

  bulkPut(table: string, documents: any, key: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).bulkPut(documents, key);
  }

  delete(table: string, key: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).delete(key);
  }

  each(table: string, callback: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).each(callback);
  }

  filter(table: string, filterFunction: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database
      .table(table)
      .filter(filterFunction)
      .toArray();
  }

  get(table: string, idOrFilterObject: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).get(idOrFilterObject);
  }

  put(table: string, document: any, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).put(document);
  }

  toArray(table: string, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).toArray();
  }

  toCollection(table: string, chainId?: number) {
    const database = this.getDatabase(chainId);
    return database.table(table).toCollection();
  }

  where(
    table: string,
    filter: any,
    clause: [string, Array<any>],
    chainId?: number
  ) {
    const database = this.getDatabase(chainId);
    const whereClause = database.table(table).where(filter);
    // @ts-ignore
    return whereClause[clause[0]](...clause[1]);
  }
}

export default MultiChainDatabaseClient;
