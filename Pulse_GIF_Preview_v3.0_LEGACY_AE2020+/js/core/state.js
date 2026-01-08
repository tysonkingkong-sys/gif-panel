// core/state.js - NO ES6 MODULES
const state = {
  media: {
    current: null,
    type: null,
    playing: false,
    muted: true,
    volume: 1
  },
  view: {
    fitMode: 'fill',
    scale: 1,
    panX: 0,
    panY: 0,
    uiHidden: false
  },
  settings: {
    theme: 'blue',
    historyLimit: 25
  }
};
