'use babel';

// eslint-disable-next-line
import { CompositeDisposable, TextEditor, Directory } from 'atom';

import config from './config';
import Creator from './Creator';
import Insertor from './Insertor';

class DavsPackage {
  constructor() {
    this.reactReduxUtilsView = null;
    this.modalPanel = null;
    this.subscriptions = null;

    this.config = config;
  }

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.creator = new Creator();
    this.insertor = new Insertor();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'davs-package:create': context => this.create(context),
      'davs-package:insert': context => this.insert(context),
      'core:confirm': (event) => {
        this.creator.confirmSelection();
        event.stopPropagation();
      },
    }));
  }

  deactivate() {
    this.subscriptions.dispose();
  }

  create(context) {
    this.creator.create(context);
  }

  insert() {
    this.insertor.insert();
  }

}

export default new DavsPackage();
