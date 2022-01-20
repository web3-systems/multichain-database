import MultichainInMemoryDatabase from '../src';

describe('MultichainInMemoryDatabase', () => {
  it('should succeed to import MultichainInMemoryDatabase', () => {
    expect(MultichainInMemoryDatabase).toBeTruthy();
  });

  it('should succeed to initialize MultichainInMemoryDatabase', () => {
    const db = new MultichainInMemoryDatabase();
    expect(db.databases).toEqual({});
    expect(db.chainIdDefault).toEqual(1);
  });
});
