'use babel';

// eslint-disable-next-line
import { CompositeDisposable, TextEditor, Directory, File } from 'atom';
import SelectList from 'atom-select-list';

import filesService from './services/files';
import utilsService from './services/utils';

const extractOwnProps = (fileContents) => {
  const startString = 'OwnProps =';
  const endString = ';';
  const startPos = fileContents.indexOf(startString) + startString.length;

  const endPos = fileContents.indexOf(endString, startPos);
  const text = fileContents.substring(startPos, endPos)
    .replace('{|', '')
    .replace('|}', '')
    .split(' ')
    .join('')
    .split('\n')
    .join('')
    .split('\r')
    .join('')
    .trim();

  const propLines = text.split(',')
    .map(propLine => propLine.split(':'))
    .filter(keyValues => keyValues.length === 2);

  return propLines;
};

const insertComponent = (fileContents, component) => {
  const editor = atom.workspace.getActiveTextEditor();

  const ownProps = extractOwnProps(fileContents);
  let hasChildren = false;
  ownProps.forEach((prop) => {
    if (prop[0].split('?').join('') === 'children') {
      hasChildren = true;
    }
  });

  const filteredOwnProps = ownProps.filter((prop) => {
    const plainProp = prop[0].split('?').join('');
    const shouldRemove = plainProp === 'children' || plainProp === 'routeParams';
    return !shouldRemove;
  });

  const editorPath = editor.getPath();
  const componentPath = `${component.path}${'\\'}${component.name}.cnt.js`;
  const relativePath = utilsService.getRelativePath(editorPath, componentPath);

  let text = `import ${component.name} from '${relativePath}';`;

  text += `\n<${component.name}`;

  filteredOwnProps.forEach((prop) => {
    text += `\n${prop[0]}={${prop[1]}}`;
  });

  if (ownProps.length > 0) {
    text += '\n';
  }

  text += ` ${hasChildren ? `>\n\n</${component.name}>` : '/>'}`;


  editor.insertText(text, {
    select: true,
  });
};

class Creator {

  insert() {
    this.initInsert();
    this.selectInsertModal.show();
    this.selectInsertView.focus();
  }

  initInsert() {
    this.editorPath = atom.workspace.getActiveTextEditor().getPath();
    this.selectInsertModal = undefined;
    this.selectInsertView = undefined;

    this.createInsertModal();
  }

  createInsertModal() {
    this.selectInsertView = new SelectList({
      items: filesService.getAllComponents(this.editorPath),
      didConfirmSelection: this.onInsertItemSelected.bind(this),
      didCancelSelection: this.cancelSelection.bind(this),
      filterKeyForItem: component => component.name,
      elementForItem: (item) => {
        const li = document.createElement('li');
        li.classList.add('two-lines');

        const div = document.createElement('div');
        div.appendChild(document.createTextNode(item.name));
        const div2 = document.createElement('div');
        div2.appendChild(document.createTextNode(item.type));

        li.appendChild(div);
        li.appendChild(div2);
        return li;
      },
    });
    this.selectInsertView.element.classList.add('fuzzy-finder');

    const container = document.createElement('div');
    const instructions = document.createTextNode('Pick a component to insert:');
    container.appendChild(instructions);
    container.appendChild(this.selectInsertView.element);

    this.selectInsertModal = atom.workspace.addModalPanel({
      item: container,
      visible: false,
    });
  }

  onInsertItemSelected(component) {
    this.selectInsertModal.hide();

    const typFile = new File(`${component.path}${'\\'}${component.name}.typ.js`);

    typFile.read().then((fileContents) => {
      insertComponent(fileContents, component);
    });
  }

  cancelSelection() {
    if (this.selectInsertModal) {
      this.selectInsertModal.hide();
    }
  }
}

export default Creator;
