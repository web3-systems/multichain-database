import MultichainInMemoryDatabase from '../src';
const mock_txs = [
  {
    hash: '0x0',
    data: '0x0',
  },
  {
    hash: '0x1',
    data: '0x1',
  },
];

describe('MultichainInMemoryDatabase.WRITES', () => {
  describe('import()', () => {
    it('should succeed to import transactions into the transactions collection', () => {
      const mcimdb = new MultichainInMemoryDatabase(1);
      mcimdb.initializeDefaultCollections(1);
      mcimdb.insert('transactions', mock_txs, 1);
      const collection = mcimdb.getCollection('transactions', 1);
      expect(collection.count()).toEqual(2);
    });
  });
});
