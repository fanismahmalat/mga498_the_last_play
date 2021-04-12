import React from 'react';

export const Context = React.createContext(null);

export const SettingsReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.field]: action.payload,
      };
    }
    default:
      return state;
  }
};

export const initialState = {
  sceneProgress: 0,
  itemInspectorOpen: false,
  itemAnimationEnabled: true,
  selectedItem: '',
  models: [],
};
