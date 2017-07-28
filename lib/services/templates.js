'use babel';

import _ from 'lodash';

const getTypTemplate = relativePath => (
`/* @flow */
import type {
  ComponentType,
  ComponentPropsType,
  MapStateToPropsType,
  MapDispatchToPropsType
} from '${relativePath}';

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

});

const mapDispatchToProps: MapDispatchToProps = dispatch => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);
const component: Component = connector(${name});

export default component;
`
);

const getComponentTemplate = name => (
`/* @flow */
import React from 'react';
import type { Props } from './${name}.typ';

const ${name} = (props: Props) => (
  <div className={\`${_.kebabCase(name)} \${props.className || ''}\`} />
);

export default ${name};
`
);

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
