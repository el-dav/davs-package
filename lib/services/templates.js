'use babel';

import _ from 'lodash';

const getContainerTemplate = name => (
`import { connect } from 'react-redux';
import ${name} from './${name}.cmp';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(${name});
`
);

const getComponentTemplate = name => (
`import React from 'react';
import PropTypes from 'prop-types';

const ${name} = props => (
  <div className="${_.kebabCase(name)}" />
);

${name}.propTypes = {

};

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
  getContainerTemplate,
  getComponentTemplate,
  getCssTemplate,
  getDuckTemplate,
  getDuckSpecTemplate,
  getServiceTemplate,
  getServiceSpecTemplate,
};
export default templatesService;
