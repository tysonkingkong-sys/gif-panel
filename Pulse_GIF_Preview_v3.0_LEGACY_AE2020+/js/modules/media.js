// js/modules/media.js

function loadMedia(file) {
  if (!file) {
    console.error('No file provided');
    return;
  }

  console.log('📂 Loading media:', file.name, file.type);

  const reader = new FileReader();
  
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    
    // Check if it's a video
    if (file.type.startsWith('video/')) {
      console.log('🎬 Loading video');
      showVideo(dataUrl);
    } else {
      console.log('🖼️ Loading image');
      showImage(dataUrl);
    }
    
    // Save to localStorage
    localStorage.setItem('gifPreview.lastGifDataUrl', dataUrl);
    
    // Hide placeholder
    const placeholder = document.getElementById('placeholder');
    if (placeholder) {
      placeholder.style.display = 'none';
    }
  };
  
  reader.onerror = function(e) {
    console.error('FileReader error:', e);
  };
  
  reader.readAsDataURL(file);
}

function showImage(dataUrl) {
  // Hide any existing video
  const existingVideo = document.querySelector('video.gif');
  if (existingVideo) {
    existingVideo.remove();
  }
  
  // Show image
  dom.img.style.display = 'block';
  dom.img.src = dataUrl;
  
  // Hide audio button for images
  if (dom.btnAudio) {
    dom.btnAudio.style.display = 'none';
  }
  
  console.log('✅ Image loaded');
}

function showVideo(dataUrl) {
  // Hide image
  dom.img.style.display = 'none';
  
  // Remove existing video
  const existingVideo = document.querySelector('video.gif');
  if (existingVideo) {
    existingVideo.remove();
  }
  
  // Create new video element
  const video = document.createElement('video');
  video.className = 'gif';
  video.src = dataUrl;
  video.loop = true;
  video.muted = localStorage.getItem('gifPreview.audioMuted') === 'true';
  video.autoplay = true;
  video.style.display = 'block';
  video.style.objectFit = 'cover';
  
  // Set volume
  const volume = parseFloat(localStorage.getItem('gifPreview.volume') || '1');
  video.volume = volume;
  
  // Append to drop container
  dom.drop.appendChild(video);
  
  // Show audio button
  if (dom.btnAudio) {
    dom.btnAudio.style.display = 'flex';
    dom.btnAudio.innerHTML = video.muted ? '🔇' : '🔊';
  }
  
  console.log('✅ Video loaded');
}

function getCurrentMedia() {
  const video = document.querySelector('video.gif');
  if (video && video.style.display !== 'none') {
    return { type: 'video', element: video };
  }
  
  if (dom.img.style.display === 'block') {
    return { type: 'image', element: dom.img };
  }
  
  return null;
}

function applyVideoFitMode() {
  const video = document.querySelector('video.gif');
  if (!video) return;
  
  const fitMode = localStorage.getItem('gifPreview.fitMode') || 'fill';
  
  switch (fitMode) {
    case 'contain':
      video.style.objectFit = 'contain';
      break;
    case 'stretch':
      video.style.objectFit = 'fill';
      break;
    case 'fill':
    default:
      video.style.objectFit = 'cover';
      break;
  }
  
  console.log('Video fit mode applied:', fitMode);
}