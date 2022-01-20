import MultichainInMemoryDatabase from '../src';

describe('MultichainInMemoryDatabase.COLLECTIONS', () => {
  describe('initializeDefaultCollections()', () => {
    it('should succeed to create a database instance and add the default collections', () => {
      const mcimdb = new MultichainInMemoryDatabase(1);
      mcimdb.initializeDefaultCollections(1);
      const collections = mcimdb.listCollections(1);
      expect(collections.length).toEqual(4);
    });
  });

  describe('getCollection()', () => {
    it('should succeed to get the "transaction" collection for the default chainId', () => {
      const mcimdb = new MultichainInMemoryDatabase(1);
      mcimdb.initializeDefaultCollections(1);
      const collectionTransaction = mcimdb.getCollection('transactions');
      expect(collectionTransaction.name).toEqual('transactions');
    });

    it('should succeed to get the "transaction" collection for the chainId argument', () => {
      const mcimdb = new MultichainInMemoryDatabase(1);
      mcimdb.initializeDefaultCollections(1);
      const collectionTransaction = mcimdb.getCollection('transactions', 1);
      expect(collectionTransaction.name).toEqual('transactions');
    });
  });
});
