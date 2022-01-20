import { Collection, DynamicView } from 'lokijs';
import { FindQuery, ChainedQuery } from './types';
import { defaultCollections } from './config/database.collections';
import {
  createAdapterOptions,
  createDatabaseInstance,
  addCollectionsToDatabaseInstance,
  selectAdapter,
  getDatabaseId,
} from './utils';
import errorCollectionDoesNotExist from './utils/errorCollectionDoesNotExist';

class MultichainInMemoryDatabase {
  databases: any = {};
  chainIdDefault: number = 1;

  constructor(chainIdDefault?: number, adapterType?: string) {
    if (chainIdDefault) {
      this.create(chainIdDefault, adapterType);
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

  create(
    chainId: number,
    adapterType: string = 'environment',
    adapterOptions?: object,
    useDefaultCollections?: boolean
  ): Loki {
    const id = getDatabaseId(chainId);
    const adapter = selectAdapter(adapterType);
    const options = createAdapterOptions(adapter, adapterOptions);
    const database = createDatabaseInstance(id, options);
    const collectionsToInitialize = useDefaultCollections
      ? defaultCollections
      : [];
    addCollectionsToDatabaseInstance(database, collectionsToInitialize);
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

  get(chainId?: number) {
    const id = getDatabaseId(chainId || this.chainIdDefault);
    if (!this.databases[id]) {
      this.create(chainId || this.chainIdDefault);
    }
    return this.databases[id];
  }

  delete(chainId?: number): void {
    const id = getDatabaseId(chainId || this.chainIdDefault);
    if (!this.databases[id]) return;
    this.databases[id].deleteDatabase();
  }

  save(chainId?: number, callback?: Function): void {
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

  addCollection(collection: object, chainId?: number): void {
    this.addCollections([collection], chainId);
  }

  addCollections(collections: Array<any>, chainId?: number): void {
    const database = this.get(chainId);
    addCollectionsToDatabaseInstance(database, collections);
  }

  getCollection(collectionName: string, chainId?: number): Collection {
    const database = this.get(chainId);
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
    const chaining = collectionObject.chain();
    const keys = Object.keys(query);
    const values = Object.values(query);
    for (let index = 0; index < keys.length; index++) {
      // @ts-ignore
      chaining[keys[index]](values[index]);
    }
    return chaining.data();
  }

  find(collection: string, find: FindQuery, chainId?: number): Array<any> {
    const collectionObject = this.getCollection(collection, chainId);
    return collectionObject.find(find);
  }

  count(collection: string, chainId?: number): number {
    const collectionObject = this.getCollection(collection, chainId);
    return collectionObject.count();
  }

  /* -------------------------------------------------------------------------- */
  // WRITES
  /* -------------------------------------------------------------------------- */

  insert(collection: string, data: any, chainId?: number): void {
    const collectionObject = this.getCollection(collection);
    collectionObject.insert(data);
    this.save(chainId);
  }

  insertBatch(collection: string, data: Array<any>, chainId?: number): void {
    this.insert(collection, data, chainId);
  }

  update(collection: string, data: any, chainId?: number): void {
    const collectionObject = this.getCollection(collection);
    collectionObject.update(data);
    this.save(chainId);
  }
}

export default MultichainInMemoryDatabase;
