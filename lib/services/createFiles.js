'use babel';

// eslint-disable-next-line
import { File } from 'atom';
import mkdirp from 'mkdirp';
import _ from 'lodash';

import templatesService from './templates';

const getRootDir = () => (
  atom.project.getPaths()[0]
);

const writeContainer = (container, name) => {
  container.write(templatesService.getContainerTemplate(name));
};

const writeComponent = (component, name) => {
  component.write(templatesService.getComponentTemplate(name));
};

const writeCss = (css, name) => {
  css.write(templatesService.getCssTemplate(name));
};

const writeDuck = (duck, name) => {
  duck.write(templatesService.getDuckTemplate(name));
};

const writeDuckSpec = (duckSpec, name) => {
  duckSpec.write(templatesService.getDuckSpecTemplate(name));
};

const writeService = (service, name) => {
  service.write(templatesService.getServiceTemplate(name));
};

const writeServiceSpec = (serviceSpec, name) => {
  serviceSpec.write(templatesService.getServiceSpecTemplate(name));
};

const createDuck = (duckName) => {
  const rootPath = getRootDir();
  const duckDir = `${rootPath}/src/ducks/${duckName}`;
  mkdirp.sync(duckDir);

  const duckPath = `${duckDir}/${duckName}.js`;
  const duckSpecPath = `${duckDir}/${duckName}.spec.js`;

  const duck = new File(duckPath);
  const duckSpec = new File(duckSpecPath);

  duck.create()
  .then(() => {
    writeDuck(duck, duckName);
  })
  .then(() => {
    atom.workspace.open(duckPath);
  });

  duckSpec.create()
  .then(() => {
    writeDuckSpec(duckSpec, duckName);
  })
  .then(() => {
    atom.workspace.open(duckSpecPath);
  });
};

const createService = (serviceName) => {
  const rootPath = getRootDir();
  const serviceDir = `${rootPath}/src/services/${serviceName}`;
  mkdirp.sync(serviceDir);

  const servicePath = `${serviceDir}/${serviceName}.js`;
  const serviceSpecPath = `${serviceDir}/${serviceName}.spec.js`;

  const service = new File(servicePath);
  const serviceSpec = new File(serviceSpecPath);

  service.create()
  .then(() => {
    writeService(service, serviceName);
  })
  .then(() => {
    atom.workspace.open(servicePath);
  });

  serviceSpec.create()
  .then(() => {
    writeServiceSpec(serviceSpec, serviceName);
  })
  .then(() => {
    atom.workspace.open(serviceSpecPath);
  });
};

const createAsset = (assetName, path) => {
  const rootPath = getRootDir();
  let assetDir = '';
  if (!path) {
    assetDir = `${rootPath}/src/assets/${assetName}`;
  } else {
    assetDir = `${path}/${assetName}`;
  }
  mkdirp.sync(assetDir);


  const containerPath = `${assetDir}/${assetName}.cnt.js`;
  const componentPath = `${assetDir}/${assetName}.cmp.js`;
  const cssPath = `${assetDir}/${assetName}.css`;

  const container = new File(containerPath);
  const component = new File(componentPath);
  const css = new File(cssPath);

  container.create()
    .then(() => {
      writeContainer(container, assetName);
    })
    .then(() => {
      atom.workspace.open(containerPath);
    });

  component.create()
    .then(() => {
      writeComponent(component, assetName);
    })
    .then(() => {
      atom.workspace.open(componentPath);
    });

  css.create()
    .then(() => {
      writeCss(css, assetName);
    })
    .then(() => {
      atom.workspace.open(cssPath);
    });
};

const create = ({ type, name, path }) => {
  if (type === 'Asset') {
    const assetName = _.upperFirst(name);
    createAsset(assetName);
  } else if (type === 'Duck') {
    const duckName = _.lowerFirst(name);
    createDuck(duckName);
  } else if (type === 'Service') {
    const serviceName = _.lowerFirst(name);
    createService(serviceName);
  } else if (type === 'Component') {
    const componentName = _.upperFirst(name);
    createAsset(componentName, path);
  }
};

const createFilesService = {
  create,
};

export default createFilesService;
