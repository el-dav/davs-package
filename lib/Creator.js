'use babel';

// eslint-disable-next-line
import { CompositeDisposable, TextEditor, Directory } from 'atom';
import SelectList from 'atom-select-list';

import createFilesService from './services/createFiles';

class Creator {

  create(context) {
    this.initCreate();

    if (
      context &&
      context.target &&
      context.target.dataset &&
      context.target.dataset.path
    ) {
      this.creation = {
        type: 'Component',
        path: context.target.dataset.path,
      };
      this.nameModal.show();
      this.nameText.element.focus();
    } else {
      this.selectModal.show();
      this.selectListView.focus();
    }

    return null;
  }

  initCreate() {
    this.creation = undefined;
    this.nameText = undefined;
    this.nameModal = undefined;
    this.selectListView = undefined;
    this.selectModal = undefined;

    this.createNameModal();
    this.createSelectModal();
  }

  createNameModal() {
    this.nameText = new TextEditor();
    this.nameText.element.setAttribute('mini', true);
    this.nameText.element.setAttribute('grow-vertically', false);
    this.nameText.getGutters().forEach((gutter) => {
      gutter.hide();
    });

    const container = document.createElement('div');
    const instructions = document.createTextNode(
      'What is the name of the new thing?'
    );
    container.appendChild(instructions);
    container.appendChild(this.nameText.element);

    this.nameModal = atom.workspace.addModalPanel({
      item: container,
      visible: false,
    });
  }

  createSelectModal() {
    this.selectListView = new SelectList({
      items: ['Asset', 'Duck', 'Service'],
      didConfirmSelection: this.onCreateItemSelected.bind(this),
      didCancelSelection: this.cancelSelection.bind(this),
      elementForItem: (item) => {
        const li = document.createElement('li');
        li.classList.add('two-lines');
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(item));
        li.appendChild(div);
        return li;
      },
    });
    this.selectListView.element.classList.add('fuzzy-finder');

    const container = document.createElement('div');
    const instructions = document.createTextNode('Pick a thing to create:');
    container.appendChild(instructions);
    container.appendChild(this.selectListView.element);

    this.selectModal = atom.workspace.addModalPanel({
      item: container,
      visible: false,
    });
  }

  onCreateItemSelected(item) {
    this.creation = {
      type: item,
    };

    this.selectModal.hide();
    this.nameModal.show();
    this.nameText.element.focus();
  }

  cancelSelection() {
    if (this.selectModal) {
      this.selectModal.hide();
    }
  }

  confirmSelection() {
    if (this.nameModal.visible) {
      this.creation.name = this.nameText.getText();
      createFilesService.create(this.creation);
      this.nameModal.hide();
      this.initCreate();
    }
  }
}

export default Creator;
