'use babel';

// eslint-disable-next-line
import { Directory } from 'atom';

const getAllComponents = (localPath) => {
  const rootPath = atom.project.getPaths()[0];
  const assetFolderPath = atom.config.get('davs-package.assetPath');
  const assetDir = `${rootPath}${assetFolderPath}`;
  const assetDirectory = new Directory(assetDir);
  const assets = assetDirectory.getEntriesSync().map(
    (dir) => {
      const pathParts = dir.path.split('\\');
      return {
        name: pathParts[pathParts.length - 1],
        type: 'asset',
        path: dir.path,
      };
    }
  );

  if (localPath) {
    const localPathparts = localPath.split('\\');
    localPathparts.pop();
    const localDir = localPathparts.join('\\');
    const localDirectory = new Directory(localDir);
    const localComponents = localDirectory.getEntriesSync()
      .filter(entry => entry.constructor.name === 'Directory')
      .map(
        (dir) => {
          const pathParts = dir.path.split('\\');
          return {
            name: pathParts[pathParts.length - 1],
            type: 'local',
            path: dir.path,
          };
        }
      );

    return localComponents.concat(assets);
  }

  return assets;
};

const insertComponent = {
  getAllComponents,
};

export default insertComponent;
