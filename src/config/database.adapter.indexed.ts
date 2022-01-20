const LokiIndexedAdapter = require('lokijs/src/loki-indexed-adapter.js');
export const IndexedDBAdapter = (name: string) => new LokiIndexedAdapter(name);
export default IndexedDBAdapter;
