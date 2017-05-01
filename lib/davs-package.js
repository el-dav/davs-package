'use babel';

// eslint-disable-next-line
import { CompositeDisposable, TextEditor } from 'atom';
import SelectList from 'atom-select-list';

import createFilesService from './services/createFiles';

export default {

  reactReduxUtilsView: null,
  modalPanel: null,
  subscriptions: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.initCreate();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'davs-package:create': context => this.create(context),
      'davs-package:insert': context => this.insert(context),
      'core:confirm': (event) => {
        this.confirmSelection();
        event.stopPropagation();
      },
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {

  },

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
  },

  initCreate() {
    this.creation = undefined;
    this.createNameModal();
    this.createSelectModal();
  },

  insert(context) {
    console.log('insert context:', context);
    this.initInsert();
  },

  initInsert() {

  },

  onCreateItemSelected(item) {
    this.creation = {
      type: item,
    };

    this.selectModal.hide();
    this.nameModal.show();
    this.nameText.element.focus();
  },

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
  },

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
  },

  cancelSelection() {
    this.selectModal.hide();
  },

  confirmSelection() {
    if (this.nameModal.visible) {
      this.creation.name = this.nameText.getText();
      createFilesService.create(this.creation);
      this.nameModal.hide();
      this.initCreate();
    }
  },
};
