// js/services/storage.js

const STORAGE_KEYS = {
  LAST_GIF: 'gifPreview.lastGifDataUrl',
  FIT_MODE: 'gifPreview.fitMode',
  UI_HIDDEN: 'gifPreview.uiHidden',
  PAN_X: 'gifPreview.panX',
  PAN_Y: 'gifPreview.panY',
  SCALE: 'gifPreview.scale',
  THEME: 'gifPreview.theme',
  AUDIO_MUTED: 'gifPreview.audioMuted',
  VOLUME: 'gifPreview.volume',
  LAST_VERSION: 'gifPreview.lastSeenVersion',
  CORNERS_ENABLED: 'gifPreview.cornersEnabled',
  BEVEL_ENABLED: 'gifPreview.bevelEnabled'
};

const MAX_STORAGE_SIZE_MB = 4; // Max file size to save in localStorage

function initStorage() {
  console.log('💾 Initializing storage...');
  
  // Set defaults if not exists
  if (!localStorage.getItem(STORAGE_KEYS.FIT_MODE)) {
    localStorage.setItem(STORAGE_KEYS.FIT_MODE, 'fill');
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
    localStorage.setItem(STORAGE_KEYS.THEME, 'blue');
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.AUDIO_MUTED)) {
    localStorage.setItem(STORAGE_KEYS.AUDIO_MUTED, 'true');
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.VOLUME)) {
    localStorage.setItem(STORAGE_KEYS.VOLUME, '1');
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CORNERS_ENABLED)) {
    localStorage.setItem(STORAGE_KEYS.CORNERS_ENABLED, 'true');
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.BEVEL_ENABLED)) {
    localStorage.setItem(STORAGE_KEYS.BEVEL_ENABLED, 'true');
  }
  
  console.log('✅ Storage initialized with defaults');
}

function restoreState() {
  console.log('🔄 Restoring previous state...');
  
  // Restore fit mode
  const fitMode = localStorage.getItem(STORAGE_KEYS.FIT_MODE) || 'fill';
  dom.app.classList.remove('fitFill', 'fitContain', 'fitStretch');
  dom.app.classList.add('fit' + fitMode.charAt(0).toUpperCase() + fitMode.slice(1));
  
  // Restore UI visibility
  const uiHidden = localStorage.getItem(STORAGE_KEYS.UI_HIDDEN) === '1';
  if (uiHidden) {
    dom.app.classList.add('uiHidden');
  }
  
  // Restore theme
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);
  if (theme && theme !== 'blue') {
    document.documentElement.classList.add(`theme-${theme}`);
  }
  
  // Restore corners and bevel
  const cornersEnabled = localStorage.getItem(STORAGE_KEYS.CORNERS_ENABLED) !== 'false';
  const bevelEnabled = localStorage.getItem(STORAGE_KEYS.BEVEL_ENABLED) !== 'false';
  
  if (cornersEnabled) {
    dom.drop.classList.add('corners-enabled');
    dom.drop.classList.remove('corners-disabled');
  } else {
    dom.drop.classList.add('corners-disabled');
    dom.drop.classList.remove('corners-enabled');
  }
  
  if (bevelEnabled) {
    dom.drop.classList.add('bevel-enabled');
    dom.drop.classList.remove('bevel-disabled');
  } else {
    dom.drop.classList.add('bevel-disabled');
    dom.drop.classList.remove('bevel-enabled');
  }
  
  // Restore last media
  const lastGif = localStorage.getItem(STORAGE_KEYS.LAST_GIF);
  if (lastGif) {
    console.log('🖼️ Restoring last media from localStorage');
    
    // Check if it's a video
    if (lastGif.includes('video/')) {
      showVideo(lastGif);
    } else {
      dom.img.style.display = 'block';
      dom.img.src = lastGif;
    }
    
    // Hide placeholder
    const placeholder = document.getElementById('placeholder');
    if (placeholder) {
      placeholder.style.display = 'none';
    }
  }
  
  console.log('✅ State restored');
}

function showVideo(dataUrl) {
  // Hide image
  dom.img.style.display = 'none';
  
  // Create video element
  const video = document.createElement('video');
  video.className = 'gif';
  video.src = dataUrl;
  video.loop = true;
  video.muted = localStorage.getItem(STORAGE_KEYS.AUDIO_MUTED) === 'true';
  video.autoplay = true;
  video.style.display = 'block';
  
  // Append to drop container
  dom.drop.appendChild(video);
  
  // Show audio button
  if (dom.btnAudio) {
    dom.btnAudio.style.display = 'flex';
    dom.btnAudio.innerHTML = video.muted ? '🔇' : '🔊';
  }
}

// Save media to localStorage with size check
function saveMediaToStorage(dataUrl) {
  if (!dataUrl) return false;
  
  const sizeInMB = dataUrl.length / (1024 * 1024);
  
  if (sizeInMB < MAX_STORAGE_SIZE_MB) {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_GIF, dataUrl);
      console.log(`💾 Saved to localStorage (${sizeInMB.toFixed(2)} MB)`);
      return true;
    } catch (e) {
      console.warn('⚠️ Could not save to localStorage:', e.message);
      // Try to clear old data and retry
      localStorage.removeItem(STORAGE_KEYS.LAST_GIF);
      try {
        localStorage.setItem(STORAGE_KEYS.LAST_GIF, dataUrl);
        console.log('💾 Saved after clearing old data');
        return true;
      } catch (e2) {
        console.error('❌ Storage quota exceeded, file too large');
        return false;
      }
    }
  } else {
    console.log(`⚠️ File too large for localStorage (${sizeInMB.toFixed(2)} MB), skipping save`);
    return false;
  }
}

// Get storage value
function getStorageValue(key) {
  return localStorage.getItem(STORAGE_KEYS[key] || key);
}

// Set storage value
function setStorageValue(key, value) {
  try {
    localStorage.setItem(STORAGE_KEYS[key] || key, value);
    return true;
  } catch (e) {
    console.error('Storage error:', e);
    return false;
  }
}

// Clear all app storage
function clearAllStorage() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  console.log('🗑️ All storage cleared');
}

// Get storage usage info
function getStorageInfo() {
  let totalSize = 0;
  Object.values(STORAGE_KEYS).forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      totalSize += value.length;
    }
  });
  
  const sizeInMB = totalSize / (1024 * 1024);
  return {
    totalSize,
    sizeInMB: sizeInMB.toFixed(2),
    itemCount: Object.keys(STORAGE_KEYS).length
  };
}

{ STORAGE_KEYS };