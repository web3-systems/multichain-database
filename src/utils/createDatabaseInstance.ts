import LokiInstance from 'lokijs';

function createDatabaseInstance(id: string, adapterOptions: object) {
  return new LokiInstance(id, adapterOptions);
}

export default createDatabaseInstance;
