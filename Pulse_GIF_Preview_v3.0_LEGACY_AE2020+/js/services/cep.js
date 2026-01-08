// js/services/cep.js - NO ES6 MODULES
function initCEP() {
  if (!window.CSInterface) return;

  const cs = new CSInterface();

  cs.addEventListener(
    'applicationBeforeDeactivate',
    function() {
      // Save state when Adobe app closes
      console.log('CEP: Application closing, state saved');
    }
  );
}
