// js/ui/controls.js - OPTIMIZED v2 - Better video thumbnails + progressive rendering
  saveMediaToDB, 
  getAllMedia,
  deleteMediaById,
  getMediaById
} from '../services/indexedDB.js';

// Pan and Zoom state
let panX = parseFloat(localStorage.getItem('gifPreview.panX') || '0');
let panY = parseFloat(localStorage.getItem('gifPreview.panY') || '0');
let scale = parseFloat(localStorage.getItem('gifPreview.scale') || '1');
let isDragging = false;
let hasMoved = false;
let startX = 0;
let startY = 0;
let startPanX = 0;
let startPanY = 0;

const MIN_SCALE = 0.1;
const MAX_SCALE = 8;
const SCALE_STEP = 1.08;

// 🚀 OPTIMIZATION: Track if history has been loaded
let historyLoaded = false;
let historyObserver = null;

// Apply transform to current media
function applyTransform() {
  const transform = `translate3d(${panX}px, ${panY}px, 0) scale(${scale})`;
  
  if (dom.img && dom.img.style.display === 'block') {
    dom.img.style.transform = transform;
  }
  
  const video = document.querySelector('video.gif');
  if (video) {
    video.style.transform = transform;
  }
}

function initControls() {
  console.log('🎮 Controls init');
  
  initPanZoom();
  
  if (dom.btnPlus) {
    dom.btnPlus.onclick = () => {
      dom.file.click();
    };
  }
  
  if (dom.file) {
    dom.file.onchange = (e) => {
      const file = e.target.files[0];
      if (file) loadFile(file);
    };
  }
  
  if (dom.btnFit) {
    dom.btnFit.onclick = (e) => {
      e.stopPropagation();
      const modes = ['fill', 'contain', 'stretch'];
      const current = localStorage.getItem('gifPreview.fitMode') || 'fill';
      const currentIndex = modes.indexOf(current);
      const next = modes[(currentIndex + 1) % 3];
      
      localStorage.setItem('gifPreview.fitMode', next);
      dom.app.classList.remove('fitFill', 'fitContain', 'fitStretch');
      dom.app.classList.add('fit' + next.charAt(0).toUpperCase() + next.slice(1));
      
      const video = document.querySelector('video.gif');
      if (video) {
        if (next === 'contain') video.style.objectFit = 'contain';
        else if (next === 'stretch') video.style.objectFit = 'fill';
        else video.style.objectFit = 'cover';
      }
    };
  }
  
  if (dom.btnHome) {
    dom.btnHome.onclick = (e) => {
      e.stopPropagation();
      
      const startPanX = panX;
      const startPanY = panY;
      const startScale = scale;
      const duration = 300;
      const startTime = performance.now();
      
      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        panX = startPanX * (1 - eased);
        panY = startPanY * (1 - eased);
        scale = startScale + (1 - startScale) * eased;
        
        applyTransform();
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          panX = 0;
          panY = 0;
          scale = 1;
          applyTransform();
          
          localStorage.setItem('gifPreview.panX', '0');
          localStorage.setItem('gifPreview.panY', '0');
          localStorage.setItem('gifPreview.scale', '1');
        }
      }
      
      requestAnimationFrame(animate);
      dom.app.classList.remove('uiHidden');
      localStorage.setItem('gifPreview.uiHidden', '0');
    };
  }
  
  if (dom.btnMinus) {
    dom.btnMinus.onclick = (e) => {
      e.stopPropagation();
      dom.app.classList.add('uiHidden');
      localStorage.setItem('gifPreview.uiHidden', '1');
    };
  }
  
  if (dom.btnSettings) {
    dom.btnSettings.onclick = (e) => {
      e.stopPropagation();
      const modal = document.getElementById('settingsModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
      }
    };
  }
  
  if (dom.btnAudio) {
    dom.btnAudio.onclick = (e) => {
      e.stopPropagation();
      const video = document.querySelector('video.gif');
      if (!video) return;
      
      video.muted = !video.muted;
      localStorage.setItem('gifPreview.audioMuted', video.muted.toString());
      dom.btnAudio.innerHTML = video.muted ? '🔇' : '🔊';
    };
  }
  
  initDragDrop();
  initSettingsModal();
  initVolumeControls();
  
  // 🚀 OPTIMIZATION: Don't load history immediately!
  // History will load on-demand when user clicks the History tab
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const settingsModal = document.getElementById('settingsModal');
      const updateModal = document.getElementById('updateModal');
      
      if (settingsModal && !settingsModal.classList.contains('hidden')) {
        settingsModal.classList.add('hidden');
        return;
      }
      
      if (updateModal && !updateModal.classList.contains('hidden')) {
        updateModal.classList.add('hidden');
        return;
      }
      
      if (dom.app.classList.contains('uiHidden')) {
        dom.app.classList.remove('uiHidden');
        localStorage.setItem('gifPreview.uiHidden', '0');
      }
    }
  });
  
  console.log('✅ Controls ready (history deferred)');
}

function initPanZoom() {
  if (!dom.drop) return;
  
  document.addEventListener('dblclick', (e) => {
    const hasMedia = dom.img && dom.img.style.display === 'block' || document.querySelector('video.gif');
    const isUIHidden = dom.app && dom.app.classList.contains('uiHidden');
    
    if (hasMoved) return;
    
    if (hasMedia && isUIHidden) {
      dom.app.classList.remove('uiHidden');
      localStorage.setItem('gifPreview.uiHidden', '0');
      e.preventDefault();
      e.stopPropagation();
    }
  });
  
  dom.drop.addEventListener('click', (e) => {
    const isUIHidden = dom.app && dom.app.classList.contains('uiHidden');
    if (!isUIHidden) return;
    
    if (hasMoved) return;
    
    if (e.target.closest('.dockBtn, .miniBtn, button')) return;
    
    dom.app.classList.remove('uiHidden');
    localStorage.setItem('gifPreview.uiHidden', '0');
    console.log('✅ UI restored (click)');
  });
  
  document.addEventListener('mousedown', (e) => {
    if (e.button === 1) e.preventDefault();
  });
  
  dom.drop.addEventListener('wheel', (e) => {
    const hasMedia = dom.img && dom.img.style.display === 'block' || document.querySelector('video.gif');
    if (!hasMedia) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const rect = dom.drop.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const oldScale = scale;
    const delta = e.deltaY < 0 ? SCALE_STEP : 1 / SCALE_STEP;
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * delta));
    
    const scaleDiff = scale / oldScale;
    panX = mouseX - (mouseX - panX) * scaleDiff;
    panY = mouseY - (mouseY - panY) * scaleDiff;
    
    localStorage.setItem('gifPreview.scale', scale.toString());
    localStorage.setItem('gifPreview.panX', panX.toString());
    localStorage.setItem('gifPreview.panY', panY.toString());
    
    applyTransform();
  }, { passive: false });
  
  dom.drop.addEventListener('mousedown', (e) => {
    const hasMedia = dom.img && dom.img.style.display === 'block' || document.querySelector('video.gif');
    if (!hasMedia || (e.button !== 0 && e.button !== 1)) return;
    
    if (e.target.closest('.dockBtn, .miniBtn, button')) return;
    
    isDragging = true;
    hasMoved = false;
    startX = e.clientX;
    startY = e.clientY;
    startPanX = panX;
    startPanY = panY;
    
    if (dom.app) dom.app.classList.add('panning');
    dom.drop.style.cursor = 'move';
    
    if (dom.img && dom.img.style.display === 'block') {
      dom.img.style.cursor = 'move';
    }
    const video = document.querySelector('video.gif');
    if (video) video.style.cursor = 'move';
    
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasMoved = true;
    
    panX = startPanX + dx;
    panY = startPanY + dy;
    applyTransform();
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      localStorage.setItem('gifPreview.panX', panX.toString());
      localStorage.setItem('gifPreview.panY', panY.toString());
      
      isDragging = false;
      if (dom.app) dom.app.classList.remove('panning');
      dom.drop.style.cursor = 'default';
      
      if (dom.img) dom.img.style.cursor = 'default';
      const video = document.querySelector('video.gif');
      if (video) video.style.cursor = 'default';
      
      setTimeout(() => hasMoved = false, 100);
    }
  });
  
  applyTransform();
}

function initDragDrop() {
  if (!dom.drop) return;
  
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dom.drop.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });
  
  ['dragenter', 'dragover'].forEach(eventName => {
    dom.drop.addEventListener(eventName, () => {
      dom.drop.classList.add('dragover');
    });
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    dom.drop.addEventListener(eventName, () => {
      dom.drop.classList.remove('dragover');
    });
  });
  
  dom.drop.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) loadFile(files[0]);
  });
}

function initVolumeControls() {
  const volumeSlider = document.getElementById('volumeControl');
  const volumePercentage = document.querySelector('.volume-percentage');
  const volumeMuteBtn = document.getElementById('volumeMuteBtn');
  const volumeProgress = document.querySelector('.volume-progress');
  const volumeBars = document.querySelectorAll('.volume-bars .bar');
  
  if (!volumeSlider) {
    console.warn('Volume slider not found');
    return;
  }
  
  const savedVolume = parseFloat(localStorage.getItem('gifPreview.volume') || '1');
  const savedMuted = localStorage.getItem('gifPreview.audioMuted') === 'true';
  
  volumeSlider.value = savedVolume;
  updateVolumeUI(savedVolume, savedMuted);
  
  // Volume slider
  volumeSlider.addEventListener('input', (e) => {
    const volume = parseFloat(e.target.value);
    localStorage.setItem('gifPreview.volume', volume.toString());
    
    if (volume > 0) {
      localStorage.setItem('gifPreview.audioMuted', 'false');
    }
    
    updateVolumeUI(volume, volume === 0);
    
    const video = document.querySelector('video.gif');
    if (video) {
      video.volume = volume;
      video.muted = volume === 0;
    }
  });
  
  // Mute button
  if (volumeMuteBtn) {
    volumeMuteBtn.addEventListener('click', () => {
      const video = document.querySelector('video.gif');
      if (!video) return;
      
      const newMuted = !video.muted;
      video.muted = newMuted;
      localStorage.setItem('gifPreview.audioMuted', newMuted.toString());
      
      const volume = parseFloat(volumeSlider.value);
      updateVolumeUI(volume, newMuted);
    });
  }
  
  function updateVolumeUI(volume, muted) {
    // Update percentage
    if (volumePercentage) {
      volumePercentage.textContent = Math.round(volume * 100) + '%';
    }
    
    // Update progress bar
    if (volumeProgress) {
      volumeProgress.style.width = (volume * 100) + '%';
    }
    
    // Update mute button icon
    if (volumeMuteBtn) {
      const icon = volumeMuteBtn.querySelector('.volume-icon');
      if (icon) {
        if (muted || volume === 0) {
          icon.textContent = '🔇';
        } else if (volume < 0.5) {
          icon.textContent = '🔉';
        } else {
          icon.textContent = '🔊';
        }
      }
    }
    
    // Update volume bars
    if (volumeBars) {
      const activeCount = Math.ceil(volume * 3);
      volumeBars.forEach((bar, index) => {
        if (index < activeCount && !muted) {
          bar.classList.add('active');
        } else {
          bar.classList.remove('active');
        }
      });
    }
  }
  
  console.log(`🔊 Volume controls initialized at ${Math.round(savedVolume * 100)}%`);
}

function initSettingsModal() {
  const modal = document.getElementById('settingsModal');
  const closeBtn = document.getElementById('settingsClose');
  
  if (!modal) return;
  
  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.add('hidden');
  }
  
  modal.onclick = (e) => {
    if (e.target.classList.contains('modalBackdrop')) {
      modal.classList.add('hidden');
    }
  };
  
  const tabs = document.querySelectorAll('.settingsTab');
  const pages = document.querySelectorAll('.settingsTabPage');
  
  tabs.forEach(tab => {
    tab.onclick = () => {
      const target = tab.dataset.tab;
      
      // Remove active state from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Hide ALL pages first and clear their content if needed
      pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
        page.style.visibility = 'hidden';
        page.style.opacity = '0';
        page.style.position = 'absolute';
        page.style.pointerEvents = 'none';
      });
      
      // Show ONLY the target page
      const targetPage = document.querySelector(`[data-page="${target}"]`);
      if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.display = 'flex';
        targetPage.style.visibility = 'visible';
        targetPage.style.opacity = '1';
        targetPage.style.position = 'relative';
        targetPage.style.pointerEvents = 'auto';
        
        // 🚀 OPTIMIZATION: Only load history when user clicks the History tab
        if (target === 'history' && !historyLoaded) {
          console.log('📚 Loading history on-demand...');
          loadHistoryLazy();
        }
      }
      
      console.log(`🔄 Switched to tab: ${target}`);
    };
  });
  
  const cornersToggle = document.getElementById('cornersToggle');
  if (cornersToggle) {
    const cornersEnabled = localStorage.getItem('gifPreview.cornersEnabled') !== 'false';
    cornersToggle.checked = cornersEnabled;
    applyCornersState(cornersEnabled);
    
    cornersToggle.addEventListener('change', (e) => {
      const isEnabled = e.target.checked;
      localStorage.setItem('gifPreview.cornersEnabled', isEnabled.toString());
      applyCornersState(isEnabled);
    });
  }
  
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    const savedTheme = localStorage.getItem('gifPreview.theme') || 'blue';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
    
    themeSelect.addEventListener('change', (e) => {
      const theme = e.target.value;
      localStorage.setItem('gifPreview.theme', theme);
      applyTheme(theme);
    });
  }
}

function applyCornersState(enabled) {
  if (!dom.drop) return;
  if (enabled) {
    dom.drop.classList.add('corners-enabled');
    dom.drop.classList.remove('corners-disabled');
  } else {
    dom.drop.classList.add('corners-disabled');
    dom.drop.classList.remove('corners-enabled');
  }
}

function applyTheme(theme) {
  document.documentElement.classList.remove('theme-blue', 'theme-pink', 'theme-purple', 'theme-green', 'theme-orange', 'theme-white', 'theme-black');
  if (theme !== 'blue') {
    document.documentElement.classList.add(`theme-${theme}`);
  }
}

// 🚀 OPTIMIZATION: Lazy load history only when needed
async function loadHistoryLazy() {
  if (historyLoaded) return;
  
  const startTime = performance.now();
  await renderHistoryList('#gifHistory');
  historyLoaded = true;
  
  const duration = performance.now() - startTime;
  console.log(`✅ History loaded in ${duration.toFixed(2)}ms`);
}

// 🚀 PROGRESSIVE RENDERING: Render items in batches
async function renderHistoryList(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error('History container not found:', containerSelector);
    return;
  }
  
  // Show loading state with skeleton
  container.innerHTML = `
    <div class="history-loading">
      <div class="spinner"></div>
      <div>Loading history...</div>
    </div>
  `;
  
  const loadHistory = async () => {
    try {
      const history = await getAllMedia();
      
      if (history.length === 0) {
        container.innerHTML = `
          <div class="empty-history">
            <div class="empty-icon">🎬</div>
            <div class="empty-text">No recent media yet</div>
            <div class="empty-subtext">Your last 12 items will appear here</div>
          </div>
        `;
        return;
      }
      
      // Create container structure with proper flex layout
      const favorites = history.filter(item => item.favorite);
      const nonFavorites = history.filter(item => !item.favorite);
      
      container.innerHTML = `
        <div class="history-stats">
          <div>
            <span class="stat-item">${nonFavorites.length} / 12 items</span>
            ${nonFavorites.length === 12 ? '<span class="stat-warning">• Limit reached</span>' : ''}
            ${favorites.length > 0 ? `<span class="stat-favorites">⭐ ${favorites.length} favorite${favorites.length > 1 ? 's' : ''}</span>` : ''}
          </div>
          <button class="clear-all-btn" id="clearAllHistoryBtn" title="Clear all non-favorited history">
            <svg class="clear-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
            </svg>
            Clear All
          </button>
        </div>
        <div class="gifHistoryScroll"></div>
      `;
      
      const scrollContainer = container.querySelector('.gifHistoryScroll');
      if (!scrollContainer) {
        console.error('Scroll container not found!');
        return;
      }
      
      // Add Clear All button handler
      const clearAllBtn = document.getElementById('clearAllHistoryBtn');
      if (clearAllBtn) {
        clearAllBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // Count favorites and non-favorites
          const favorites = history.filter(item => item.favorite);
          const nonFavorites = history.filter(item => !item.favorite);
          
          if (nonFavorites.length === 0) {
            alert('All items are favorited!\n\nUnfavorite some items first to clear them.');
            return;
          }
          
          let message = `Delete ${nonFavorites.length} item${nonFavorites.length > 1 ? 's' : ''} from history?\n\n`;
          
          if (favorites.length > 0) {
            message += `⭐ ${favorites.length} favorited item${favorites.length > 1 ? 's' : ''} will be kept.\n\n`;
          }
          
          message += 'This cannot be undone.\n\n' +
                    'Click OK to delete, Cancel to keep them.';
          
          const confirmed = confirm(message);
          
          if (!confirmed) {
            console.log('❌ Clear all cancelled');
            return;
          }
          
          console.log(`🗑️ Clearing ${nonFavorites.length} non-favorited items...`);
          if (favorites.length > 0) {
            console.log(`⭐ Keeping ${favorites.length} favorited items`);
          }
          
          try {
            // Delete only non-favorited items
            for (const item of nonFavorites) {
              await deleteMediaById(item.id);
              console.log(`   Deleted: ${item.name}`);
            }
            
            console.log(`✅ Deleted ${nonFavorites.length} items`);
            if (favorites.length > 0) {
              console.log(`⭐ Kept ${favorites.length} favorite${favorites.length > 1 ? 's' : ''}`);
            }
            
            // Re-render to show remaining favorites or empty state
            await renderHistoryList(containerSelector);
          } catch (error) {
            console.error('❌ Failed to clear history:', error);
            alert('Failed to clear history. Check console for details.');
          }
        });
      }
      
      console.log(`📚 Rendering ${history.length} history items...`);
      
      // 🚀 PROGRESSIVE RENDERING: Render in batches
      const BATCH_SIZE = 10;
      let currentBatch = 0;
      
      function renderBatch() {
        const start = currentBatch * BATCH_SIZE;
        const end = Math.min(start + BATCH_SIZE, history.length);
        
        for (let i = start; i < end; i++) {
          const historyItem = createHistoryItem(history[i], i);
          scrollContainer.appendChild(historyItem);
        }
        
        console.log(`✅ Rendered batch ${currentBatch + 1}: items ${start}-${end}`);
        currentBatch++;
        
        // Continue rendering if more items exist
        if (end < history.length) {
          requestAnimationFrame(renderBatch);
        } else {
          // All items rendered, setup lazy loading
          console.log('🖼️ Setting up lazy loading for thumbnails...');
          setupLazyLoadingForThumbnails(scrollContainer);
        }
      }
      
      // Start rendering first batch
      renderBatch();
    } catch (error) {
      console.error('Error loading history:', error);
      container.innerHTML = `
        <div class="empty-history">
          <div class="empty-icon">⚠️</div>
          <div class="empty-text">Failed to load history</div>
          <div class="empty-subtext">${error.message}</div>
        </div>
      `;
    }
  };
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadHistory());
  } else {
    setTimeout(() => loadHistory(), 0);
  }
}

// 🚀 OPTIMIZATION: Lazy load thumbnails as they enter viewport
function setupLazyLoadingForThumbnails(container) {
  if (!container) {
    console.error('No container provided for lazy loading');
    return;
  }
  
  const thumbnails = container.querySelectorAll('.history-preview[data-src]');
  console.log(`🖼️ Found ${thumbnails.length} thumbnails to lazy load`);
  
  if (thumbnails.length === 0) {
    console.warn('No thumbnails found with data-src attribute');
    return;
  }
  
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported, loading all thumbnails immediately');
    // Fallback: load all immediately
    thumbnails.forEach((img, index) => {
      loadThumbnail(img, index);
    });
    return;
  }
  
  // Clean up previous observer if exists
  if (historyObserver) {
    historyObserver.disconnect();
  }
  
  historyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const actualSrc = img.dataset.src;
        
        if (actualSrc && !img.src) {
          // Get index from data attribute
          const index = parseInt(img.dataset.index) || undefined;
          loadThumbnail(img, index);
          historyObserver.unobserve(img);
        }
      }
    });
  }, {
    root: container,
    rootMargin: '150px', // Start loading 150px before entering viewport
    threshold: 0.01
  });
  
  // Observe all thumbnails
  thumbnails.forEach((img, index) => {
    // Store index on the element for later retrieval
    img.dataset.index = index;
    historyObserver.observe(img);
  });
  
  console.log('✅ Lazy loading observer set up');
}

// Helper function to load a single thumbnail
function loadThumbnail(img, index) {
  const actualSrc = img.dataset.src;
  
  if (!actualSrc) {
    console.error('Thumbnail has no data-src attribute', img);
    return;
  }
  
  // 🔍 Check if this is actually a video file (not a thumbnail)
  if (actualSrc.startsWith('data:video/')) {
    const sizeMB = (actualSrc.length / 1024 / 1024).toFixed(2);
    const itemName = img.alt || 'Unknown';
    
    console.warn(
      `⚠️ "${itemName}" has full video instead of thumbnail (${sizeMB} MB)\n` +
      `   This video was uploaded before thumbnail generation was fixed.\n` +
      `   💡 To fix: Delete this item and re-upload it.`
    );
    
    // Don't try to load the full video as an image
    img.style.opacity = '1';
    img.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    img.removeAttribute('data-src');
    
    // Add video icon with tooltip
    const wrapper = img.closest('.history-thumbnail-wrapper');
    if (wrapper && !wrapper.querySelector('.thumbnail-video-icon')) {
      const videoIcon = document.createElement('div');
      videoIcon.className = 'thumbnail-video-icon';
      videoIcon.title = 'Old video without thumbnail - delete and re-upload to fix';
      videoIcon.innerHTML = '🎬';
      videoIcon.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        opacity: 0.8;
        pointer-events: none;
      `;
      wrapper.appendChild(videoIcon);
    }
    return;
  }
  
  // Show loading state
  img.style.opacity = '0.5';
  img.style.transition = 'opacity 0.3s ease';
  
  // Create a new image to test if data URL is valid
  const testImg = new Image();
  
  testImg.onload = () => {
    // Valid image, load it
    img.src = actualSrc;
    img.style.opacity = '1';
    img.removeAttribute('data-src');
    if (index !== undefined) {
      console.log(`✅ Loaded thumbnail ${index + 1}`);
    }
  };
  
  testImg.onerror = (error) => {
    console.error('Failed to load thumbnail:', {
      index: index,
      srcLength: actualSrc ? actualSrc.length : 0,
      srcPrefix: actualSrc ? actualSrc.substring(0, 50) + '...' : 'null',
      error: error
    });
    
    // Set fallback gradient background
    img.style.opacity = '1';
    img.style.background = 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
    img.removeAttribute('data-src');
    
    // Add error icon
    const wrapper = img.closest('.history-thumbnail-wrapper');
    if (wrapper && !wrapper.querySelector('.thumbnail-error')) {
      const errorIcon = document.createElement('div');
      errorIcon.className = 'thumbnail-error';
      errorIcon.innerHTML = '⚠️';
      errorIcon.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        opacity: 0.5;
        pointer-events: none;
      `;
      wrapper.appendChild(errorIcon);
    }
  };
  
  // Trigger the test load
  testImg.src = actualSrc;
}

function createHistoryItem(item, index) {
  const div = document.createElement('div');
  div.className = 'gifHistoryItem enhanced-item';
  if (index === 0) div.classList.add('newest');
  if (item.favorite) div.classList.add('favorited');
  div.dataset.id = item.id;
  
  const thumbnailSrc = item.thumbnail || item.src;
  
  // Debug logging
  if (index < 3) { // Log first 3 items for debugging
    console.log(`Creating history item ${index}:`, {
      name: item.name,
      type: item.type,
      hasThumbnail: !!item.thumbnail,
      thumbnailSize: thumbnailSrc ? thumbnailSrc.length : 0,
      thumbnailPrefix: thumbnailSrc ? thumbnailSrc.substring(0, 50) : 'none',
      favorite: item.favorite || false
    });
  }
  
  // 🚀 OPTIMIZATION: Use data-src instead of src for lazy loading
  // Add skeleton background while loading
  div.innerHTML = `
    <div class="history-thumbnail-wrapper">
      <img data-src="${thumbnailSrc}" 
           class="history-preview" 
           alt="${item.name}"
           style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%);" />
      ${item.type === 'VIDEO' ? '<div class="video-play-overlay">▶</div>' : ''}
      ${item.favorite ? '<div class="favorite-badge">⭐</div>' : ''}
    </div>
    <div class="item-info">
      <div class="item-filename" title="${item.name}">${truncateFilename(item.name, 25)}</div>
      <div class="item-details">
        <span class="item-type">${item.type}</span>
      </div>
    </div>
    ${index === 0 ? '<div class="new-badge">NEW</div>' : ''}
    <button class="favorite-btn" data-id="${item.id}" title="${item.favorite ? 'Remove from favorites' : 'Add to favorites'}">
      ${item.favorite ? '⭐' : '☆'}
    </button>
  `;
  
  // Click to load (only on the main area, not buttons)
  div.addEventListener('click', (e) => {
    if (e.target.closest('.favorite-btn')) {
      return; // Let favorite button handle its own click
    }
    loadFromHistory(item);
  });
  
  // Favorite button handler
  const favoriteBtn = div.querySelector('.favorite-btn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await toggleFavorite(item.id, !item.favorite);
    });
  }
  
  return div;
}

function truncateFilename(name, maxLength) {
  if (name.length <= maxLength) return name;
  const ext = name.split('.').pop();
  const nameWithoutExt = name.substring(0, name.length - ext.length - 1);
  const truncated = nameWithoutExt.substring(0, maxLength - ext.length - 4);
  return `${truncated}...${ext}`;
}

// Toggle favorite status
async function toggleFavorite(itemId, newFavoriteState) {
  try {
    console.log(`${newFavoriteState ? '⭐' : '☆'} ${newFavoriteState ? 'Adding to' : 'Removing from'} favorites...`);
    
    // Get the item
    const item = await getMediaById(itemId);
    if (!item) {
      console.error('Item not found:', itemId);
      return;
    }
    
    // Update favorite status
    item.favorite = newFavoriteState;
    
    // Delete old entry and save updated one
    await deleteMediaById(itemId);
    
    // Re-save with new favorite status
    const transaction = window.indexedDB ? await new Promise((resolve, reject) => {
      const dbRequest = indexedDB.open('GifPreviewDB', 2);
      dbRequest.onsuccess = () => resolve(dbRequest.result);
      dbRequest.onerror = () => reject(dbRequest.error);
    }) : null;
    
    if (transaction) {
      const tx = transaction.transaction(['mediaFiles'], 'readwrite');
      const store = tx.objectStore('mediaFiles');
      store.add(item);
      
      await new Promise((resolve, reject) => {
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });
      
      transaction.close();
    }
    
    console.log(`✅ ${newFavoriteState ? 'Added to' : 'Removed from'} favorites: ${item.name}`);
    
    // Re-render history if loaded
    if (historyLoaded) {
      await renderHistoryList('#gifHistory');
    }
  } catch (error) {
    console.error('Failed to toggle favorite:', error);
  }
}

function loadFromHistory(item) {
  const modal = document.getElementById('settingsModal');
  if (modal) modal.classList.add('hidden');
  
  if (item.type === 'VIDEO') {
    loadVideo(item.src);
  } else {
    loadImage(item.src);
  }
  
  const ph = document.getElementById('placeholder');
  if (ph) ph.style.display = 'none';
}

async function loadFile(file) {
  console.log('📁 Loading file:', file.name, file.type);
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataUrl = e.target.result;
    
    // Save to localStorage (for quick restore on panel reload)
    saveMediaToStorage(dataUrl);
    
    // Load media immediately for display
    if (file.type.startsWith('video/')) {
      loadVideo(dataUrl);
    } else {
      loadImage(dataUrl);
    }
    
    // Hide placeholder
    const ph = document.getElementById('placeholder');
    if (ph) ph.style.display = 'none';
    
    // 🚀 Save to history with deduplication and limit
    console.log('💾 Saving to history...');
    try {
      // Get existing history
      const existingHistory = await getAllMedia();
      
      // 🔍 Check for duplicates by filename
      const duplicate = existingHistory.find(item => item.name === file.name);
      
      if (duplicate) {
        console.log(`🔄 Duplicate found: "${file.name}" - removing old entry`);
        await deleteMediaById(duplicate.id);
      }
      
      // Add new entry with thumbnail generation
      await addToHistory(file, dataUrl);
      console.log('✅ Saved to history successfully');
      
      // 🗑️ Enforce 12-item limit (excluding favorites)
      const updatedHistory = await getAllMedia();
      const favorites = updatedHistory.filter(item => item.favorite);
      const nonFavorites = updatedHistory.filter(item => !item.favorite);
      
      // Only limit non-favorites to 12
      if (nonFavorites.length > 12) {
        const itemsToDelete = nonFavorites.slice(12); // Keep first 12 newest non-favorites
        console.log(`🗑️ History limit exceeded. Removing ${itemsToDelete.length} oldest non-favorited items...`);
        if (favorites.length > 0) {
          console.log(`⭐ Keeping all ${favorites.length} favorited items`);
        }
        
        for (const item of itemsToDelete) {
          await deleteMediaById(item.id);
          console.log(`   Deleted: ${item.name}`);
        }
        
        console.log(`✅ History trimmed (12 regular items + ${favorites.length} favorites)`);
      }
      
      // 🚀 OPTIMIZATION: Only re-render history if it's already been loaded
      if (historyLoaded) {
        console.log('🔄 Refreshing history display...');
        await renderHistoryList('#gifHistory');
      }
    } catch (error) {
      console.error('❌ Failed to save to history:', error);
      
      // Fallback: save without thumbnail if addToHistory fails
      console.warn('⚠️ Attempting fallback save without thumbnail...');
      try {
        await saveMediaToDB(file, dataUrl, dataUrl);
        console.log('✅ Saved with fallback method');
        
        if (historyLoaded) {
          await renderHistoryList('#gifHistory');
        }
      } catch (fallbackError) {
        console.error('❌ Fallback save also failed:', fallbackError);
      }
    }
  };
  
  reader.onerror = (e) => {
    console.error('❌ FileReader error:', e);
  };
  
  reader.readAsDataURL(file);
}

function loadImage(dataUrl) {
  const oldVideo = document.querySelector('video.gif');
  if (oldVideo) oldVideo.remove();
  
  if (dom.img) {
    dom.img.style.display = 'block';
    dom.img.src = dataUrl;
    dom.img.style.cursor = 'default';
  }
  
  if (dom.btnAudio) dom.btnAudio.style.display = 'none';
  applyTransform();
}

function loadVideo(dataUrl) {
  if (dom.img) dom.img.style.display = 'none';
  
  const oldVideo = document.querySelector('video.gif');
  if (oldVideo) oldVideo.remove();
  
  const video = document.createElement('video');
  video.className = 'gif';
  video.src = dataUrl;
  video.loop = true;
  video.autoplay = true;
  video.muted = localStorage.getItem('gifPreview.audioMuted') !== 'false';
  video.style.display = 'block';
  video.style.cursor = 'default';
  
  const volume = parseFloat(localStorage.getItem('gifPreview.volume') || '1');
  video.volume = volume;
  
  const fitMode = localStorage.getItem('gifPreview.fitMode') || 'fill';
  if (fitMode === 'contain') video.style.objectFit = 'contain';
  else if (fitMode === 'stretch') video.style.objectFit = 'fill';
  else video.style.objectFit = 'cover';
  
  if (dom.drop) dom.drop.appendChild(video);
  
  if (dom.btnAudio) {
    dom.btnAudio.style.display = 'flex';
    dom.btnAudio.innerHTML = video.muted ? '🔇' : '🔊';
  }
  
  setTimeout(() => applyTransform(), 100);
}