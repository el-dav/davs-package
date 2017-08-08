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
  baseComponent: {
    order: 3,
    title: 'Base Component',
    description: 'What should the default component be for you .cmp files?',
    type: 'string',
    default: 'div',
  },
  assetPath: {
    order: 4,
    title: 'Asset path',
    description: 'Path to the project\'s assets folder',
    type: 'string',
    default: '/src/assets',
  },
  duckPath: {
    order: 5,
    title: 'Duck path',
    description: 'Path to the project\'s ducks folder',
    type: 'string',
    default: '/src/ducks',
  },
  servicePath: {
    order: 6,
    title: 'Service path',
    description: 'Path to the project\'s asset folder',
    type: 'string',
    default: '/src/services',
  },
  typesPath: {
    order: 7,
    title: 'Types path',
    description: 'Path to the project\'s types folder',
    type: 'string',
    default: '/src/types',
  },
};

export default config;
