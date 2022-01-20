function addCollectionsToDatabaseInstance(
  database: Loki,
  collections: Array<any>
): void {
  for (const collection of collections) {
    database.addCollection(collection.name, collection.options);
  }
}

export default addCollectionsToDatabaseInstance;
