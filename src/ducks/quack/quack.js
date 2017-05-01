const ACTION = 'davs-package/quack/ACTION';

const initialState = {};

const quack = (state = initialState, action = {}) => {
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

export default quack;
