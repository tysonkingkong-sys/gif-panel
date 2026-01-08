// js/main.js - NO ES6 MODULES
console.log('🧱 BOOT: Starting application...');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      initApp().catch(function(err) {
        console.error('Failed to initialize:', err);
      });
    }, 100);
  });
} else {
  setTimeout(function() {
    initApp().catch(function(err) {
      console.error('Failed to initialize:', err);
    });
  }, 100);
}
