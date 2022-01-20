import validateAdapterOptions from './validateAdapterOptions';

function createAdapterOptions(adapter: LokiFsAdapter, adapterOptions?: object) {
  const _name = adapter.toString();
  const adapterOptionsValidated = validateAdapterOptions(_name, adapterOptions);
  return {
    adapter: adapter,
    ...adapterOptionsValidated,
  };
}

export default createAdapterOptions;
