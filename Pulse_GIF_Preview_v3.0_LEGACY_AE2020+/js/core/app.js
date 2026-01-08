// js/core/app.js - NO ES6 MODULES
async function initApp() {
  console.log('🚀 App initialization starting...');

  try {
    await initIndexedDB();
    console.log('✅ IndexedDB initialized');
    
    initStorage();
    console.log('✅ Storage initialized');

    restoreState();
    console.log('✅ State restored');

    initThemes();
    console.log('✅ Themes initialized');

    initControls();
    console.log('✅ Controls initialized');

    console.log('🎯 App initialization complete!');
  } catch (error) {
    console.error('❌ App initialization failed:', error);
  }
}
