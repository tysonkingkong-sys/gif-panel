// js/ui/modals.js - CEP 9.x COMPATIBLE

function initModals() {
  console.log('🪟 Initializing modals...');

  initSettingsModal();
  initUpdateModal();
  
  console.log('✅ Modals ready');
}

function initSettingsModal() {
  var modal = document.getElementById('settingsModal');
  var closeBtn = document.getElementById('settingsClose');
  var backdrop = modal ? modal.querySelector('.modalBackdrop') : null;
  
  if (!modal) {
    console.error('❌ Settings modal not found');
    return;
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    });
  }
  
  if (backdrop) {
    modal.addEventListener('click', function(e) {
      if (e.target.classList.contains('modalBackdrop')) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }
  
  var tabs = document.querySelectorAll('.settingsTab');
  var pages = document.querySelectorAll('.settingsTabPage');
  
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.dataset.tab;
      
      tabs.forEach(function(t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      
      pages.forEach(function(page) {
        page.classList.remove('active');
        page.style.display = 'none';
      });
      
      var targetPage = document.querySelector('[data-page="' + target + '"]');
      if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.display = 'flex';
      }
    });
  });
  
  console.log('✅ Settings modal initialized');
}

function initUpdateModal() {
  var modal = document.getElementById('updateModal');
  var closeBtn = document.getElementById('updateClose');
  var backdrop = modal ? modal.querySelector('.modalBackdrop') : null;
  
  if (!modal) {
    console.error('❌ Update modal not found');
    return;
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      localStorage.setItem('gifPreview.lastSeenVersion', '3.0');
    });
  }
  
  if (backdrop) {
    modal.addEventListener('click', function(e) {
      if (e.target.classList.contains('modalBackdrop')) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        localStorage.setItem('gifPreview.lastSeenVersion', '3.0');
      }
    });
  }
  
  var lastSeen = localStorage.getItem('gifPreview.lastSeenVersion');
  if (lastSeen !== '3.0') {
    setTimeout(function() {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    }, 500);
  }
  
  console.log('✅ Update modal initialized');
}
