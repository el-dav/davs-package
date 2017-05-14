'use babel';

const config = {
  includeCssFile: {
    order: 1,
    title: 'Include css file',
    description: 'Create a css file when creating an asset',
    type: 'boolean',
    default: true,
  },
  includeSpecFile: {
    order: 2,
    title: 'Include spec files',
    description: 'Create spec files alongside ducks and services',
    type: 'boolean',
    default: true,
  },
  assetPath: {
    order: 3,
    title: 'Asset path',
    description: 'Path to the projects assets folder',
    type: 'string',
    default: '/src/assets',
  },
  duckPath: {
    order: 4,
    title: 'Duck path',
    description: 'Path to the projects ducks folder',
    type: 'string',
    default: '/src/ducks',
  },
  servicePath: {
    order: 5,
    title: 'Service path',
    description: 'Path to the services asset folder',
    type: 'string',
    default: '/src/services',
  },
};

export default config;
