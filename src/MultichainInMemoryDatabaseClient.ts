import { Collection, DynamicView } from 'lokijs';

import { defaultCollections } from './config/database.collections';
import { FindQuery, ChainedQuery } from './types';
import {
  createAdapterOptions,
  createDatabaseInstance,
  addCollectionsToDatabaseInstance,
  selectAdapter,
  getDatabaseId,
} from './utils';
import errorCollectionDoesNotExist from './utils/errorCollectionDoesNotExist';

interface DatabaseOptions {
  adapter: string;
  autoload?: boolean;
  autoloadCallback?: Function;
  autosave?: boolean;
  autosaveInterval?: number;
}

class MultichainInMemoryDatabase {
  chainIdDefault: number = 1;
  databases: {
    [key: string]: Loki;
  } = {};

  constructor(chainIdDefault?: number, options?: DatabaseOptions) {
    if (chainIdDefault && options) {
      this.create(chainIdDefault, options);
      this.chainIdDefault = chainIdDefault || 1;
    }
    return this;
  }

  setChainIdDefault(chainId: number): void {
    this.chainIdDefault = chainId;
  }

  /* -------------------------------------------------------------------------- */
  // DATABASES
  /* -------------------------------------------------------------------------- */

  create(chainId: number, options: DatabaseOptions): Loki {
    const id = getDatabaseId(chainId);
    if (this.databases[id]) return this.databases[id];
    const adapter = selectAdapter(options?.adapter);
    const adapterOptions = createAdapterOptions(adapter, options);
    const database = createDatabaseInstance(id, adapterOptions);
    this.databases[id] = database;
    return database;
  }

  import(serializedDb: string, options: object = {}, chainId?: number): void {
    const database = this.get(chainId);
    database.loadJSON(serializedDb, options);
  }

  export(chainId?: number): string {
    const database = this.get(chainId);
    return database.serialize();
  }

  get(chainId?: number): Loki {
    const id = getDatabaseId(chainId || this.chainIdDefault);
    if (!this.databases[id]) {
      this.create(chainId || this.chainIdDefault, {
        adapter: 'environment',
      });
    }
    return this.databases[id];
  }

  delete(chainId?: number): void {
    const id = getDatabaseId(chainId || this.chainIdDefault);
    if (!this.databases[id]) return;
    this.databases[id].deleteDatabase();
  }

  save(chainId?: number, callback?: any): void {
    const database = this.get(chainId || this.chainIdDefault);
    database.save(callback);
  }

  /* -------------------------------------------------------------------------- */
  // COLLECTIONS
  /* -------------------------------------------------------------------------- */
  initializeDefaultCollections(chainId?: number): void {
    const database = this.get(chainId);
    addCollectionsToDatabaseInstance(database, defaultCollections);
    this.save(chainId);
  }

  addEventHook(
    collection: string,
    event: string,
    hook: any,
    chainId?: number
  ): void {
    const Collection = this.getCollection(collection, chainId);
    Collection.on(event, hook);
  }

  addEventsHook(collection: string, hook: any, chainId?: number): void {
    const Collection = this.getCollection(collection, chainId);
    const _events = [
      'insert',
      'update',
      'remove',
      'findAndRemove',
      'findAndUpdate',
    ];
    Collection.on(_events, hook);
  }

  addCollection(collection: object, chainId?: number): void {
    this.addCollections([collection], chainId);
  }

  addCollections(collections: Array<any>, chainId?: number): void {
    const database = this.get(chainId);
    addCollectionsToDatabaseInstance(database, collections);
  }

  getCollection(collectionName: string, chainId?: number): Collection {
    const database = this.get(chainId || this.chainIdDefault);
    const collectionObject = database.getCollection(collectionName);
    errorCollectionDoesNotExist(collectionName, collectionObject);
    return collectionObject;
  }

  listCollections(chainId?: number): Array<Collection> {
    const database = this.get(chainId);
    return database.listCollections();
  }

  addDynamicView(
    collection: string,
    viewName: string,
    options: DynamicViewOptions,
    chainId?: number
  ): DynamicView {
    const collectionObject = this.getCollection(collection, chainId);
    const view = collectionObject.addDynamicView(viewName, options);
    this.save(chainId || this.chainIdDefault);
    return view;
  }

  addTransform(
    collection: string,
    name: string,
    transform: Array<Transform>,
    chainId?: number
  ): void {
    const collectionObject = this.getCollection(collection, chainId);
    collectionObject.addTransform(name, transform);
    this.save(chainId);
  }

  /* -------------------------------------------------------------------------- */
  // READS
  /* -------------------------------------------------------------------------- */
  search(
    collection: string,
    query: ChainedQuery,
    chainId?: number
  ): Array<any> {
    const collectionObject = this.getCollection(collection, chainId);
    let chaining = collectionObject.chain();
    const keys = Object.keys(query);
    const values = Object.values(query);
    for (let index = 0; index < keys.length; index++) {
      // @ts-ignore
      chaining = chaining[keys[index]](values[index]);
    }
    return chaining.data();
  }

  getDocument(
    collection: string,
    id: number,
    returnPosition: boolean,
    chainId?: number
  ) {
    return this.getCollection(collection, chainId).get(id, returnPosition);
  }

  getDynamicView(collection: string, name: string, chainId?: number) {
    return this.getCollection(collection, chainId).getDynamicView(name);
  }

  getTransform(collection: string, name: string, chainId?: number) {
    return this.getCollection(collection, chainId).getTransform(name);
  }

  find(collection: string, find: FindQuery, chainId?: number): Array<any> {
    return this.getCollection(collection, chainId).find(find);
  }

  findOne(collection: string, find: any, chainId?: number): any {
    return this.getCollection(collection, chainId).findOne(find);
  }

  count(collection: string, chainId?: number): number {
    return this.getCollection(collection, chainId).count();
  }

  /* -------------------------------------------------------------------------- */
  // WRITES
  /* -------------------------------------------------------------------------- */

  insert(collection: string, data: any, chainId?: number): void {
    const Collection = this.getCollection(collection, chainId);
    Collection.insert(data);
    Collection.emit('insert', {
      event: 'insert',
      collection: collection,
    });
    this.save(chainId);
  }

  update(collection: string, data: any, chainId?: number): void {
    const Collection = this.getCollection(collection, chainId);
    Collection.update(data);
    Collection.emit('update', {
      event: 'update',
      collection: collection,
    });
    this.save(chainId);
  }

  remove(collection: string, document: any, chainId?: number): void {
    const Collection = this.getCollection(collection, chainId);
    Collection.remove(document);
    Collection.emit('remove', {
      event: 'remove',
      collection: collection,
    });
    this.save(chainId);
  }

  findAndRemove(collection: string, find: FindQuery, chainId?: number): void {
    const Collection = this.getCollection(collection, chainId);
    Collection.findAndRemove(find);
    Collection.emit('findAndRemove', {
      event: 'findAndRemove',
      collection: collection,
    });
    this.save(chainId);
  }

  findAndUpdate(
    collection: string,
    find: FindQuery,
    updateFunction: any,
    chainId?: number
  ): void {
    const Collection = this.getCollection(collection, chainId);
    Collection.findAndUpdate(find, updateFunction);
    Collection.emit('findAndUpdate', {
      event: 'findAndUpdate',
      collection: collection,
    });
    this.save(chainId);
  }
}

export default MultichainInMemoryDatabase;
