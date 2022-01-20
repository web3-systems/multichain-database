const LokiFsAdapter = require('lokijs/src/loki-fs-sync-adapter.js');
export const FileSystemDBAdapter = (name: string) => new LokiFsAdapter(name);
export default FileSystemDBAdapter;
