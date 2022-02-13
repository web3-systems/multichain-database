export const sets = {
  name: 'sets',
  options: {
    unique: ['id'],
    indices: ['id'],
    exact: [
      'id',
      'name',
      'object',
      'timestamp',
      'version',
      'keywords',
      'tags',
      'description',
      'contentUri',
      'entities',
      'conditions',
      'rules',
    ],
  },
};

export const metaCollections = [sets];

export default metaCollections;
