import MultiChainDatabase from '../src/MultiChainDatabase';

describe('MultiChainDatabase', () => {
  it('should succeed to import MultiChainDatabase', () => {
    expect(MultiChainDatabase).toBeTruthy();
  });

  it('should succeed to initialize MultiChainDatabase', () => {
    const dbChain1 = new MultiChainDatabase(1);
    console.log(dbChain1);
  });
});
