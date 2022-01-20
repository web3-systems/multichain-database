import MultichainInMemoryDatabase from '../src';

describe('MultichainInMemoryDatabase.Database', () => {
  describe('create()', () => {
    it('should succeed to create a database instance during instance construction', () => {
      const mcimdb = new MultichainInMemoryDatabase(1);
      const db = mcimdb.get(1);
      expect(db.ENV).toEqual('NODEJS');
      expect(db.databaseVersion).toEqual(1.5);
    });
  });

  describe('import()', () => {});

  describe('export()', () => {});

  describe('get()', () => {});

  describe('delete()', () => {});

  describe('setChainIdDefault()', () => {});
});
