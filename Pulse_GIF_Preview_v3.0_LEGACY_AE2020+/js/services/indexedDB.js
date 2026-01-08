// js/services/indexedDB.js - IndexedDB for large file storage

const DB_NAME = 'GifPreviewDB';
const DB_VERSION = 2; // Bumped version to add thumbnail support
const STORE_NAME = 'mediaFiles';
const MAX_STORAGE_GB = 5;
const MAX_STORAGE_BYTES = MAX_STORAGE_GB * 1024 * 1024 * 1024;

let db = null;

// Initialize IndexedDB
async function initIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => {
      console.error('❌ IndexedDB failed to open:', request.error);
      reject(request.error);
    };
    
    request.onsuccess = () => {
      db = request.result;
      console.log('✅ IndexedDB opened successfully');
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      db = event.target.result;
      
      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        objectStore.createIndex('name', 'name', { unique: false });
        console.log('📦 Created IndexedDB object store');
      }
    };
  });
}

// Save media file to IndexedDB
async function saveMediaToDB(file, dataUrl, thumbnail = null) {
  if (!db) {
    console.warn('IndexedDB not initialized');
    return false;
  }
  
  try {
    // Check total storage usage first
    const currentSize = await getTotalStorageSize();
    const newFileSize = dataUrl.length + (thumbnail ? thumbnail.length : 0);
    
    if (currentSize + newFileSize > MAX_STORAGE_BYTES) {
      console.warn(`⚠️ Storage limit reached (${(currentSize / (1024 * 1024 * 1024)).toFixed(2)} GB). Removing oldest files...`);
      await removeOldestFile();
      // Try again after cleanup
      return saveMediaToDB(file, dataUrl, thumbnail);
    }
    
    const mediaItem = {
      id: Date.now().toString(),
      name: file.name,
      type: detectMediaType(file.type, file.name),
      src: dataUrl,
      thumbnail: thumbnail || dataUrl, // Use thumbnail if provided, otherwise use original
      size: file.size,
      dataSize: dataUrl.length,
      thumbnailSize: thumbnail ? thumbnail.length : 0,
      timestamp: Date.now(),
      mimeType: file.type
    };
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(mediaItem);
      
      request.onsuccess = () => {
        const sizeInMB = dataUrl.length / (1024 * 1024);
        const thumbSizeKB = thumbnail ? (thumbnail.length / 1024).toFixed(1) : 0;
        console.log(`💾 Saved to IndexedDB: ${file.name} (${sizeInMB.toFixed(2)} MB, thumb: ${thumbSizeKB} KB)`);
        resolve(true);
      };
      
      request.onerror = () => {
        console.error('❌ Failed to save to IndexedDB:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error saving to IndexedDB:', error);
    return false;
  }
}

// Get all media files from IndexedDB
async function getAllMedia() {
  if (!db) return [];
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    
    request.onsuccess = () => {
      // Sort by timestamp, newest first
      const items = request.result.sort((a, b) => b.timestamp - a.timestamp);
      resolve(items);
    };
    
    request.onerror = () => {
      console.error('Error getting media:', request.error);
      reject(request.error);
    };
  });
}

// Get media by ID
async function getMediaById(id) {
  if (!db) return null;
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Delete media by ID
async function deleteMediaById(id) {
  if (!db) return false;
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => {
      console.log('🗑️ Deleted from IndexedDB:', id);
      resolve(true);
    };
    
    request.onerror = () => {
      console.error('Error deleting media:', request.error);
      reject(request.error);
    };
  });
}

// Clear all media
async function clearAllMedia() {
  if (!db) return false;
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();
    
    request.onsuccess = () => {
      console.log('🗑️ Cleared all media from IndexedDB');
      resolve(true);
    };
    
    request.onerror = () => reject(request.error);
  });
}

// Get total storage size
async function getTotalStorageSize() {
  const allMedia = await getAllMedia();
  return allMedia.reduce((total, item) => {
    return total + (item.dataSize || 0) + (item.thumbnailSize || 0);
  }, 0);
}

// Get storage info
async function getStorageInfo() {
  const allMedia = await getAllMedia();
  const totalSize = await getTotalStorageSize();
  
  return {
    itemCount: allMedia.length,
    totalSize: totalSize,
    totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
    totalSizeGB: (totalSize / (1024 * 1024 * 1024)).toFixed(2),
    maxSizeGB: MAX_STORAGE_GB,
    percentUsed: ((totalSize / MAX_STORAGE_BYTES) * 100).toFixed(1)
  };
}

// Remove oldest file to make space
async function removeOldestFile() {
  const allMedia = await getAllMedia();
  if (allMedia.length === 0) return;
  
  // Sort by timestamp, oldest first
  const oldest = allMedia.sort((a, b) => a.timestamp - b.timestamp)[0];
  await deleteMediaById(oldest.id);
  console.log('🗑️ Removed oldest file to make space:', oldest.name);
}

// Helper functions
function detectMediaType(mimeType, fileName) {
  if (mimeType.startsWith('video/')) return 'VIDEO';
  
  const ext = fileName.split('.').pop().toLowerCase();
  if (ext === 'gif') return 'GIF';
  if (ext === 'png') return 'PNG';
  if (ext === 'jpg' || ext === 'jpeg') return 'JPG';
  
  return 'IMAGE';
}

// Get most recent media
async function getMostRecentMedia() {
  const allMedia = await getAllMedia();
  return allMedia.length > 0 ? allMedia[0] : null;
}
