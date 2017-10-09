'use babel';

import _ from 'lodash';

const getTypTemplate = () => (
`/* @flow */
import type {
  ComponentType,
  ComponentPropsType,
  MapStateToPropsType,
  MapDispatchToPropsType
} from 'types/types';

export type OwnProps = {|
  className?: string,
|};

/* set to void if not used*/
export type StateProps = {|
  className: ?string,
|};

/* set to void if not used*/
export type DispatchProps = {|

|};

export type MapStateToProps = MapStateToPropsType<StateProps>;
export type MapDispatchToProps = MapDispatchToPropsType<DispatchProps>;
export type Props = ComponentPropsType<StateProps, DispatchProps>
export type Component = ComponentType<OwnProps>;

`
);

const getContainerTemplate = name => (
`/* @flow */
import { connect } from 'react-redux';
import ${name} from './${name}.cmp';

import type {
  OwnProps,
  MapStateToProps,
  MapDispatchToProps,
  Component
} from './${name}.typ';

const mapStateToProps: MapStateToProps = (state, ownProps: OwnProps) => ({
  className: ownProps.className,
});

const mapDispatchToProps: MapDispatchToProps = dispatch => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);
const component: Component = connector(${name});

export default component;
`
);

const getComponentTemplate = (name) => {
  const baseComponent = atom.config.get('davs-package.baseComponent');
  const importEntity = baseComponent === 'Entity';

  return (
`/* @flow */
import React from 'react';\
${importEntity ? '\nimport { Entity } from \'aframe-react\';' : ''}
import type { Props } from './${name}.typ';

const ${name} = (props: Props) => (
  <${baseComponent} className={\`${_.kebabCase(name)} \${props.className || ''}\`}>

  </${baseComponent}>
);

export default ${name};
`
  );
};

const getCssTemplate = name => (
`.${_.kebabCase(name)}{}
`
);

const getDuckTemplate = (name) => {
  const rootPath = atom.project.getPaths()[0];
  const projectName = rootPath.split('\\').pop();
  return (
`const ACTION = '${projectName}/${name}/ACTION';

const initialState = {};

const ${name} = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION:
      return { ...state };
    default:
      return state;
  }
};

export const action = () => ({
  type: ACTION,
});

export default ${name};
`
  );
};

const getDuckSpecTemplate = name => (
`import * as duck from './${name}';

const reducer = duck.default;

describe('${name} duck', () => {
  const initialState = reducer(undefined, {});

  it('should exist', () => {
    expect(reducer).toBeDefined();
  });
  /*
  it('should return the initialState', () => {
    expect(initialState.<SOMETHING>).toBe(<SOMETHING>);
  });
  */

  /*
  describe('ACTIONS', () => {
    describe('<ACTION_NAME>', () => {
      const action = duck.<actionName>();
      const actionConst = duck.<ACTION_NAME>;

      it('should exist', () => {
        expect(duck.<actionName>).toBeDefined();
      });
      it('should generate the correct action', () => {
        const expectedAction = {
          type: actionConst,
        };
        expect(action).toEqual(expectedAction);
      });
      it('should be handled by the reducer', () => {
        const newState = reducer(initialState, action);
        expect(newState.<SOMETHING>).toBe(<SOMETHING>);
      });
    });
  });
  */

  /*
  describe('SELECTORS', () => {
    const state = {
      ${name}: {
        <SOMETHING>: <SOMETHING>,
      },
    };

    describe('<selectorName>', () => {
      const selector = duck.<selectorName>;

      it('should exist', () => {
        expect(selector).toBeDefined();
      });
      it('should select <SOMETHING>', () => {
        expect(selector(state)).toBe(<SOMETHING>);
      });
    });
  });
  */
});
`
);

const getServiceTemplate = name => (
`/* @flow */
/* const <serviceFunction> = () => <something> */

const ${name}Service = {
  /* <serviceFunction> */
};

export default ${name}Service;
`
);

const getServiceSpecTemplate = name => (
`import ${name}Service from './${name}';

describe('${name}Service', () => {
  it('should exist', () => {
    expect(${name}Service).toBeDefined();
  });

  /*
  describe('<serviceFunction>', () => {
    const <serviceFunction>' = geometryService.<serviceFunction>';

    it('should exist', () => {
      expect(<serviceFunction>).toBeDefined();
    });
  });
  */
});
`
);

const getTypeTemplate = name => (
`/* @flow */
export type ${name} = {|

|};
`
);

const templatesService = {
  getTypTemplate,
  getContainerTemplate,
  getComponentTemplate,
  getCssTemplate,
  getDuckTemplate,
  getDuckSpecTemplate,
  getServiceTemplate,
  getServiceSpecTemplate,
  getTypeTemplate,
};
export default templatesService;
