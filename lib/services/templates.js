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
  const baseComponent = atom.config.get('davs-package.assetPath');
  const importEntity = baseComponent === 'Entity';

  return (
`/* @flow */
import React from 'react';\
${importEntity && '\nimport { Entity } from \'aframe-react\';'}
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
`import ${name}Duck from './${name}';

describe('${name}Duck', () => {
  it('should exist', () => {
    expect(${name}Duck.toBeDefined());
  });
});
`
);

const getServiceTemplate = name => (
`const ${name}Service = {

};

export default ${name}Service;
`
);

const getServiceSpecTemplate = name => (
`import ${name}Service from './${name}';

describe('${name}Service', () => {
  it('should exist', () => {
    expect(${name}Service.toBeDefined());
  });
});
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
};
export default templatesService;
