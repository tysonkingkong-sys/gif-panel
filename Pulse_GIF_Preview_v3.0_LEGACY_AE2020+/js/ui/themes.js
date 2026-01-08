// js/ui/themes.js - Updated with softer NATEN gradient

const THEMES = {
  blue: {
    name: '💎 Blue (Default)',
    type: 'complete',
    panel: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      backgroundImage: null,
      border: 'none',
      borderRadius: '0',
      boxShadow: 'none'
    },
    colors: {
      primary: '#38bdf8',
      primaryDark: '#0ea5e9',
      primaryLight: '#7dd3fc',
      accent: '#38bdf8',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)'
    },
    corners: {
      color: '#38bdf8',
      glow: true,
      size: '32px',
      thickness: '3px',
      glowColor: 'rgba(56, 189, 248, 0.6)'
    },
    buttons: {
      background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(56, 189, 248, 0.3))',
      hoverBackground: 'linear-gradient(135deg, rgba(56, 189, 248, 0.4), rgba(56, 189, 248, 0.5))',
      activeBackground: 'rgba(56, 189, 248, 0.7)',
      textColor: '#ffffff',
      border: '1px solid rgba(56, 189, 248, 0.4)',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(56, 189, 248, 0.2)'
    }
  },

  jay: {
    name: '💚 Jay',
    type: 'complete',
    panel: {
      background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
      backgroundImage: 'url("themes/jay-bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlur: '8px',
      border: 'none',
      borderRadius: '0',
      boxShadow: 'none'
    },
    colors: {
      primary: '#10b981',
      primaryDark: '#059669',
      primaryLight: '#34d399',
      accent: '#ffffff',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.9)'
    },
    corners: {
      color: '#10b981',
      glow: true,
      size: '32px',
      thickness: '3px',
      glowColor: 'rgba(16, 185, 129, 1)'
    },
    buttons: {
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(16, 185, 129, 0.35))',
      hoverBackground: 'linear-gradient(135deg, rgba(16, 185, 129, 0.5), rgba(16, 185, 129, 0.6))',
      activeBackground: 'rgba(16, 185, 129, 0.8)',
      textColor: '#ffffff',
      border: '1px solid rgba(16, 185, 129, 0.6)',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(16, 185, 129, 0.4)'
    },
    effects: {
      neonGlow: true
    }
  },

  naten: {
    name: '💗 NATEN',
    type: 'complete',
    panel: {
      background: '#F8C8DC',
      backgroundImage: 'url("themes/naten-bg.png")',
      backgroundSize: 'auto 50%',
      backgroundPosition: 'left bottom',
      backgroundBlur: '0px',
      border: 'none',
      borderRadius: '0',
      boxShadow: 'none'
    },
    colors: {
      primary: '#F8C8DC',
      primaryDark: '#db2777',
      primaryLight: '#f472b6',
      accent: '#F8C8DC',
      text: '#000000',
      textSecondary: 'rgba(0, 0, 0, 0.8)'
    },
    corners: {
      color: '#F8C8DC',
      glow: true,
      size: '32px',
      thickness: '3px',
      glowColor: 'rgba(248, 200, 220, 0.9)'
    },
    buttons: {
      background: '#E5E4E2',
      hoverBackground: '#F8C8DC',
      activeBackground: '#ec4899',
      textColor: '#000000',
      border: '1px solid rgba(248, 200, 220, 0.5)',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(248, 200, 220, 0.3)'
    },
    effects: {
      softGlow: true,
      kawaii: true
    }
  },

  shammy: {
    name: '⚡ Shammy',
    type: 'complete',
    panel: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      backgroundImage: null, // Set to 'url("themes/shammy-bg.png")' once you add the image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlur: '0px',
      border: 'none',
      borderRadius: '0',
      boxShadow: 'none'
    },
    colors: {
      primary: '#fbbf24',
      primaryDark: '#f59e0b',
      primaryLight: '#fcd34d',
      accent: '#fbbf24',
      text: '#fbbf24',
      textSecondary: 'rgba(251, 191, 36, 0.8)'
    },
    corners: {
      color: '#fbbf24',
      glow: true,
      size: '32px',
      thickness: '3px',
      glowColor: 'rgba(251, 191, 36, 0.8)'
    },
    buttons: {
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.3))',
      hoverBackground: 'linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(251, 191, 36, 0.5))',
      activeBackground: 'rgba(251, 191, 36, 0.7)',
      textColor: '#000000',
      border: '1px solid rgba(251, 191, 36, 0.5)',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(251, 191, 36, 0.3)'
    },
    effects: {
      electricGlow: true
    }
  },

  white: {
    name: '🤍 White',
    type: 'complete',
    panel: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      backgroundImage: null,
      border: '1px solid #cbd5e1',
      borderRadius: '0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    colors: {
      primary: '#0f172a',
      primaryDark: '#020617',
      primaryLight: '#334155',
      accent: '#3b82f6',
      text: '#0f172a',
      textSecondary: 'rgba(15, 23, 42, 0.7)'
    },
    corners: {
      color: '#3b82f6',
      glow: true,
      size: '32px',
      thickness: '3px',
      glowColor: 'rgba(59, 130, 246, 0.4)'
    },
    buttons: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.15))',
      hoverBackground: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.25))',
      activeBackground: 'rgba(59, 130, 246, 0.3)',
      textColor: '#0f172a',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.15)'
    }
  },

  black: {
    name: '🖤 Black',
    type: 'complete',
    panel: {
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)',
      backgroundImage: null,
      border: '1px solid #262626',
      borderRadius: '0',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    },
    colors: {
      primary: '#ffffff',
      primaryDark: '#e5e5e5',
      primaryLight: '#ffffff',
      accent: '#ffffff',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.6)'
    },
    corners: {
      color: '#ffffff',
      glow: true,
      size: '32px',
      thickness: '3px',
      glowColor: 'rgba(255, 255, 255, 0.5)'
    },
    buttons: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.15))',
      hoverBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.25))',
      activeBackground: 'rgba(255, 255, 255, 0.3)',
      textColor: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    }
  }
};

function initThemes() {
  console.log('🎨 Initializing themes...');
  
  const themeSelect = document.getElementById('themeSelect');
  if (!themeSelect) {
    console.warn('Theme selector not found');
    return;
  }
  
  populateThemeOptions(themeSelect);
  
  const savedTheme = localStorage.getItem('gifPreview.theme') || 'blue';
  themeSelect.value = savedTheme;
  applyTheme(savedTheme);
  
  themeSelect.addEventListener('change', (e) => {
    const theme = e.target.value;
    applyTheme(theme);
    localStorage.setItem('gifPreview.theme', theme);
    showNotification(THEMES[theme].name);
  });
  
  // Initialize enhanced theme selector
  initEnhancedThemeSelector();
  
  console.log('✅ Themes initialized');
}

function populateThemeOptions(selectElement) {
  selectElement.innerHTML = '';
  
  Object.entries(THEMES).forEach(([key, theme]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = theme.name;
    option.setAttribute('data-color', theme.colors.primary);
    selectElement.appendChild(option);
  });
  
  // Add custom styling to the select element
  selectElement.classList.add('theme-select-enhanced');
}

// Create custom theme selector with previews
function createCustomThemeSelector() {
  const container = document.createElement('div');
  container.className = 'custom-theme-selector';
  container.innerHTML = `
    <div class="theme-grid">
      ${Object.entries(THEMES).map(([key, theme]) => `
        <div class="theme-card" data-theme="${key}">
          <div class="theme-preview" style="background: ${theme.panel.background}">
            <div class="theme-preview-accent" style="background: ${theme.colors.primary}"></div>
          </div>
          <div class="theme-card-name">${theme.name}</div>
        </div>
      `).join('')}
    </div>
  `;
  
  return container;
}

// Initialize enhanced theme selector
function initEnhancedThemeSelector() {
  const themeSelect = document.getElementById('themeSelect');
  if (!themeSelect) return;
  
  const parent = themeSelect.parentElement;
  
  // Hide the original dropdown
  themeSelect.style.display = 'none';
  
  // Create visual theme grid
  const customSelector = createCustomThemeSelector();
  parent.appendChild(customSelector);
  
  // Handle theme card clicks
  customSelector.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
      const themeName = card.dataset.theme;
      applyTheme(themeName);
      localStorage.setItem('gifPreview.theme', themeName);
      showNotification(THEMES[themeName].name);
      
      // Update active state
      customSelector.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      // Update hidden select value
      themeSelect.value = themeName;
    });
  });
  
  // Set initial active state
  const savedTheme = localStorage.getItem('gifPreview.theme') || 'blue';
  const activeCard = customSelector.querySelector(`[data-theme="${savedTheme}"]`);
  if (activeCard) activeCard.classList.add('active');
}

function applyTheme(themeName) {
  const theme = THEMES[themeName];
  if (!theme) return;
  
  const app = document.getElementById('app');
  const drop = document.getElementById('drop');
  if (!app) return;
  
  const existingBg = app.querySelector('.theme-bg-layer');
  if (existingBg) existingBg.remove();
  
  app.style.background = theme.panel.background;
  app.style.border = theme.panel.border;
  app.style.borderRadius = theme.panel.borderRadius;
  app.style.boxShadow = theme.panel.boxShadow;
  
  if (theme.panel.backgroundImage) {
    const bgLayer = document.createElement('div');
    bgLayer.className = 'theme-bg-layer';
    bgLayer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: ${theme.panel.backgroundImage};
      background-size: ${theme.panel.backgroundSize || 'cover'};
      background-position: ${theme.panel.backgroundPosition || 'center'};
      background-repeat: no-repeat;
      filter: blur(${theme.panel.backgroundBlur || '0px'});
      z-index: 0;
      pointer-events: none;
    `;
    
    if (drop) {
      drop.insertBefore(bgLayer, drop.firstChild);
      drop.style.position = 'relative';
      drop.style.overflow = 'hidden';
    } else {
      app.insertBefore(bgLayer, app.firstChild);
    }
    app.style.position = 'relative';
    app.style.overflow = 'hidden';
  }
  
  if (drop) {
    drop.style.background = 'transparent';
    drop.style.border = 'none';
    drop.style.boxShadow = 'none';
    drop.style.position = 'relative';
    drop.style.zIndex = '1';
  }
  
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.colors.primary);
  root.style.setProperty('--theme-primary-dark', theme.colors.primaryDark);
  root.style.setProperty('--theme-primary-light', theme.colors.primaryLight);
  root.style.setProperty('--theme-text', theme.colors.text);
  root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
  
  const corners = document.querySelectorAll('.corner');
  corners.forEach(corner => {
    corner.style.borderColor = theme.corners.color;
    corner.style.width = theme.corners.size;
    corner.style.height = theme.corners.size;
    corner.style.borderWidth = theme.corners.thickness;
    
    if (theme.corners.glow) {
      const glowColor = theme.corners.glowColor || theme.corners.color;
      corner.style.filter = `drop-shadow(0 0 8px ${glowColor})`;
    }
  });
  
  const buttons = document.querySelectorAll('.dockBtn, .miniBtn, button, .settingsTab');
  
  buttons.forEach(button => {
    button.style.background = theme.buttons.background;
    button.style.color = theme.buttons.textColor;
    button.style.border = theme.buttons.border;
    button.style.borderRadius = theme.buttons.borderRadius || '8px';
    button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    if (theme.buttons.boxShadow) {
      button.style.boxShadow = theme.buttons.boxShadow;
    }
    
    button.addEventListener('mouseenter', function() {
      this.style.background = theme.buttons.hoverBackground;
      this.style.transform = 'translateY(-2px) scale(1.02)';
      this.style.boxShadow = theme.buttons.boxShadow ? `0 6px 30px ${theme.colors.primary}40` : 'none';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.background = theme.buttons.background;
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = theme.buttons.boxShadow || 'none';
    });
    
    button.addEventListener('mousedown', function() {
      this.style.background = theme.buttons.activeBackground;
      this.style.transform = 'translateY(0) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.background = theme.buttons.hoverBackground;
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
  });
  
  const textElements = document.querySelectorAll('.placeholder, .empty-text, .item-filename, .item-details, .history-stats, .stat-item, label, p, h1, h2, h3, h4, h5, h6, span');
  textElements.forEach(el => {
    if (!el.closest('button')) {
      el.style.color = theme.colors.text;
    }
  });
  
  const modals = document.querySelectorAll('.modal, .modalContent, .settingsModal');
  modals.forEach(modal => {
    modal.style.background = theme.panel.background;
    modal.style.color = theme.colors.text;
    modal.style.border = theme.panel.border;
    modal.style.boxShadow = theme.panel.boxShadow;
  });
  
  const modalCards = document.querySelectorAll('.modalCard');
  modalCards.forEach(card => {
    card.style.background = theme.panel.background;
    card.style.border = `2px solid ${theme.colors.primary}40`;
    card.style.boxShadow = `0 20px 60px ${theme.colors.primary}40`;
  });
  
  const modalHeaders = document.querySelectorAll('.modalHeader');
  modalHeaders.forEach(header => {
    header.style.background = `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`;
    header.style.borderBottom = `1px solid ${theme.colors.primary}30`;
  });
  
  const settingsBodies = document.querySelectorAll('.settingsBody, .settingsPanel');
  settingsBodies.forEach(body => {
    body.style.background = theme.panel.background;
  });
  
  const tabPages = document.querySelectorAll('.settingsTabPage');
  tabPages.forEach(page => {
    page.style.background = `${theme.colors.primary}10`;
    page.style.backdropFilter = 'blur(10px)';
  });
  
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.style.background = theme.buttons.background;
    input.style.color = theme.buttons.textColor;
    input.style.border = theme.buttons.border;
    input.style.borderRadius = theme.buttons.borderRadius || '8px';
  });
  
  const historyItems = document.querySelectorAll('.gifHistoryItem, .history-thumbnail-wrapper');
  historyItems.forEach(item => {
    item.style.background = theme.buttons.background;
    item.style.border = theme.buttons.border;
    item.style.color = theme.colors.text;
  });
  
  const dock = document.querySelector('.dock');
  if (dock) {
    dock.style.background = `${theme.buttons.background} !important`;
  }
  
  if (themeName === 'naten') {
    // Add glassmorphism to all containers
    const settingGroups = document.querySelectorAll('.settingGroup');
    settingGroups.forEach(group => {
      group.style.background = 'rgba(255, 255, 255, 0.7)';
      group.style.border = '2px solid rgba(248, 200, 220, 0.5)';
      group.style.boxShadow = '0 8px 32px rgba(248, 200, 220, 0.3)';
      group.style.backdropFilter = 'blur(10px)';
      group.style.webkitBackdropFilter = 'blur(10px)';
    });
    
    const tabPages = document.querySelectorAll('.settingsTabPage');
    tabPages.forEach(page => {
      page.style.background = 'rgba(255, 255, 255, 0.5)';
      page.style.backdropFilter = 'blur(15px)';
      page.style.webkitBackdropFilter = 'blur(15px)';
    });
    
    const modalCards = document.querySelectorAll('.modalCard');
    modalCards.forEach(card => {
      card.style.background = 'rgba(255, 255, 255, 0.8)';
      card.style.border = '2px solid rgba(248, 200, 220, 0.6)';
      card.style.boxShadow = '0 20px 60px rgba(248, 200, 220, 0.4)';
      card.style.backdropFilter = 'blur(20px)';
      card.style.webkitBackdropFilter = 'blur(20px)';
    });
    
    const settingsBodies = document.querySelectorAll('.settingsBody, .settingsPanel');
    settingsBodies.forEach(body => {
      body.style.background = 'rgba(255, 255, 255, 0.6)';
      body.style.backdropFilter = 'blur(15px)';
      body.style.webkitBackdropFilter = 'blur(15px)';
    });
    
    const inputs = document.querySelectorAll('.settingGroup input, .settingGroup select');
    inputs.forEach(input => {
      input.style.background = 'rgba(255, 255, 255, 0.9)';
      input.style.color = '#000000';
      input.style.border = '2px solid rgba(248, 200, 220, 0.5)';
      input.style.backdropFilter = 'blur(5px)';
      input.style.webkitBackdropFilter = 'blur(5px)';
    });
    
    const labels = document.querySelectorAll('.settingGroup label, .settingsTabPage label');
    labels.forEach(label => {
      label.style.color = '#000000';
      label.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.8)';
    });
    
    const descriptions = document.querySelectorAll('.settingGroup p, .settingsTabPage p, .settingsTabPage span');
    descriptions.forEach(desc => {
      desc.style.color = '#000000';
      desc.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.8)';
    });
    
    const settingsTitles = document.querySelectorAll('.settingsTabPage h1, .settingsTabPage h2, .settingsTabPage h3, .settingsTabPage h4');
    settingsTitles.forEach(title => {
      title.style.color = '#000000';
      title.style.textShadow = '0 2px 4px rgba(255, 255, 255, 0.8)';
    });
    
    const historyText = document.querySelectorAll('.history-stats, .stat-item, .empty-text, .empty-subtext');
    historyText.forEach(text => {
      text.style.color = '#000000';
      text.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.8)';
    });
    
    const historyItems = document.querySelectorAll('.gifHistoryItem');
    historyItems.forEach(item => {
      item.style.background = 'rgba(255, 255, 255, 0.7)';
      item.style.border = '2px solid rgba(248, 200, 220, 0.5)';
      item.style.color = '#000000';
      item.style.backdropFilter = 'blur(10px)';
      item.style.webkitBackdropFilter = 'blur(10px)';
    });
    
    const itemFilenames = document.querySelectorAll('.item-filename, .item-details');
    itemFilenames.forEach(filename => {
      filename.style.color = '#000000';
      filename.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.8)';
    });
    
    // Apply glassmorphism to placeholder text
    const placeholder = document.querySelector('.placeholder');
    if (placeholder) {
      placeholder.style.color = '#000000';
      placeholder.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.9)';
    }
  }
  
  console.log('Theme applied:', themeName);
}

function showNotification(themeName) {
  const notif = document.createElement('div');
  notif.textContent = `Theme: ${themeName}`;
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--theme-primary);
    color: #000;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2000);
}

function getCurrentTheme() {
  return localStorage.getItem('gifPreview.theme') || 'blue';
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(100px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  #app {
    position: relative !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
  }
  
  #drop {
    position: relative !important;
    flex: 1 !important;
    width: 100% !important;
    min-height: 0 !important;
    z-index: 1;
  }
  
  .theme-bg-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    pointer-events: none;
  }
  
  .bottom {
    position: relative;
    z-index: 10;
    flex-shrink: 0;
  }
  
  .dock {
    background: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .miniBtn {
    background: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .gif, video.gif {
    position: relative;
    z-index: 5;
  }
  
  .placeholder {
    position: relative;
    z-index: 5;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  }
  
  .corner {
    position: absolute !important;
    z-index: 3;
  }
  
  .gifHistoryScroll::-webkit-scrollbar {
    width: 8px;
  }
  
  .gifHistoryScroll::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  
  .gifHistoryScroll::-webkit-scrollbar-thumb {
    background: var(--theme-primary);
    border-radius: 4px;
  }
  
  .gifHistoryScroll::-webkit-scrollbar-thumb:hover {
    background: var(--theme-primary-dark);
  }
`;
document.head.appendChild(style);

{ THEMES };