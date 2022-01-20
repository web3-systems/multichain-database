import MultichainInMemoryDatabase from '../src';
const mock_txs = [
  {
    hash: '0x0',
    data: '0x2',
  },
  {
    hash: '0x1',
    data: '0x2',
  },
];

describe('MultichainInMemoryDatabase.READS', () => {
  const mcimdb = new MultichainInMemoryDatabase(1);
  mcimdb.initializeDefaultCollections(1);
  mcimdb.insert('transactions', mock_txs, 1);

  describe('find()', () => {
    it('should succeed to find a single transaction matching a FindQuery object filter.', () => {
      const findQuery = {
        hash: { $eq: '0x0' },
      };
      const documents = mcimdb.find('transactions', findQuery, 1);
      expect(documents.length).toEqual(1);
    });

    it('should succeed to find a multiple transactions matching a FindQuery object filter.', () => {
      const findQuery = {
        data: { $eq: '0x2' },
      };
      const documents = mcimdb.find('transactions', findQuery, 1);
      expect(documents.length).toEqual(2);
    });
  });

  describe('search()', () => {
    it('should succeed to find a transaction matching a ChainQuery object filter.', () => {
      const chainQuery = {
        find: {
          hash: { $eq: '0x0' },
        },
      };
      const documents = mcimdb.search('transactions', chainQuery, 1);
      expect(documents[0].hash).toEqual('0x0');
    });

    it('should succeed to find/limit a transaction matching a ChainQuery object filter.', () => {
      const chainQuery = {
        find: {
          hash: { $eq: '0x0' },
        },
        limit: 1,
      };
      const documents = mcimdb.search('transactions', chainQuery, 1);
      expect(documents.length).toEqual(1);
    });

    it('should succeed to find a transactions using an advanced ChainQuery object filter.', () => {
      const chainQuery = {
        find: {
          hash: { $eq: '0x0' },
        },
        limit: 1,
      };
      const documents = mcimdb.search('transactions', chainQuery, 1);
      expect(documents.length).toEqual(1);
    });
  });
});
