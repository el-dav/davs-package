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

const writeTyp = (typ) => {
  typ.write(templatesService.getTypTemplate());
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
  const duckFolderPath = atom.config.get('davs-package.duckPath');
  const duckDir = `${rootPath}${duckFolderPath}/${duckName}`;
  mkdirp.sync(duckDir);

  const duckPath = `${duckDir}/${duckName}.js`;
  const duck = new File(duckPath);
  duck.create()
  .then(() => {
    writeDuck(duck, duckName);
  })
  .then(() => {
    atom.workspace.open(duckPath);
  });

  const includeSpecFile = atom.config.get('davs-package.includeSpecFile');
  if (includeSpecFile) {
    const duckSpecPath = `${duckDir}/${duckName}.spec.js`;
    const duckSpec = new File(duckSpecPath);
    duckSpec.create()
    .then(() => {
      writeDuckSpec(duckSpec, duckName);
    })
    .then(() => {
      atom.workspace.open(duckSpecPath);
    });
  }
};

const createService = (serviceName) => {
  const rootPath = getRootDir();
  const serviceFolderPath = atom.config.get('davs-package.servicePath');
  const serviceDir = `${rootPath}${serviceFolderPath}/${serviceName}`;
  mkdirp.sync(serviceDir);

  const servicePath = `${serviceDir}/${serviceName}.js`;
  const service = new File(servicePath);
  service.create()
  .then(() => {
    writeService(service, serviceName);
  })
  .then(() => {
    atom.workspace.open(servicePath);
  });


  const includeSpecFile = atom.config.get('davs-package.includeSpecFile');
  if (includeSpecFile) {
    const serviceSpecPath = `${serviceDir}/${serviceName}.spec.js`;
    const serviceSpec = new File(serviceSpecPath);
    serviceSpec.create()
    .then(() => {
      writeServiceSpec(serviceSpec, serviceName);
    })
    .then(() => {
      atom.workspace.open(serviceSpecPath);
    });
  }
};

const createAsset = (assetName, path) => {
  const rootDir = getRootDir();

  let assetDir = '';
  if (!path) {
    const assetFolderPath = atom.config.get('davs-package.assetPath');
    assetDir = `${rootDir}${assetFolderPath}/${assetName}`;
  } else {
    assetDir = `${path}/${assetName}`;
  }
  mkdirp.sync(assetDir);

  const includeCssFile = atom.config.get('davs-package.includeCssFile');
  if (includeCssFile) {
    const cssPath = `${assetDir}/${assetName}.css`;
    const css = new File(cssPath);
    css.create()
      .then(() => {
        writeCss(css, assetName);
      })
      .then(() => {
        atom.workspace.open(cssPath);
      });
  }

  const typPath = `${assetDir}/${assetName}.typ.js`;
  const typ = new File(typPath);
  typ.create()
    .then(() => {
      writeTyp(typ);
    })
    .then(() => {
      atom.workspace.open(typPath);
    });


  const containerPath = `${assetDir}/${assetName}.cnt.js`;
  const container = new File(containerPath);
  container.create()
    .then(() => {
      writeContainer(container, assetName);
    })
    .then(() => {
      atom.workspace.open(containerPath);
    });

  const componentPath = `${assetDir}/${assetName}.cmp.js`;
  const component = new File(componentPath);
  component.create()
    .then(() => {
      writeComponent(component, assetName);
    })
    .then(() => {
      atom.workspace.open(componentPath);
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
