import { LokiFsAdapter } from 'lokijs';

import { IndexedDBAdapter } from '../config/database.adapter.indexed';
// import { FileSystemDBAdapter } from '../config/database.adapter.fs';

function selectAdapter(adapterType: string): LokiFsAdapter {
  switch (adapterType) {
    case 'environment':
      return IndexedDBAdapter('multichain-evm');
    case 'indexeddb':
    case 'indexedDB':
      return IndexedDBAdapter('multichain-evm');
    default:
      return IndexedDBAdapter('multichain-evm');
  }
}

export default selectAdapter;
