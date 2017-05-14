'use babel';

// eslint-disable-next-line
import { Directory } from 'atom';

const getAllComponents = (context) => {
  const rootPath = atom.project.getPaths()[0];
  const assetFolderPath = atom.config.get('davs-package.assetPath');
  const assetDir = `${rootPath}${assetFolderPath}`;
  const directory = new Directory(assetDir);
  const assets = directory.getEntriesSync().map(
    (asetDirectory) => {
      const pathParts = asetDirectory.path.split('\\');
      return pathParts[pathParts.length - 1];
    }
  );

  return assets;
};

const insertComponent = {
  getAllComponents,
};

export default insertComponent;
