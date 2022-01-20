function errorCollectionDoesNotExist(
  collection: string,
  collectionObject: object
) {
  if (!collectionObject) {
    throw new Error(
      `MultichainInMemoryDatabase: Collection Unavailable ${collection}`
    );
  }
}

export default errorCollectionDoesNotExist;
