# GIF Preview - Fixed Project Structure

## 🔧 What Was Fixed

### 1. **Folder Structure** ✅
Your JavaScript files were all in the root folder, but they need to be organized based on your imports:

```
BEFORE (Wrong):
gif-preview/
├── index.html
├── main.js
├── app.js
├── controls.js
└── ... (all files mixed together)

AFTER (Correct):
gif-preview/
├── index.html
├── style.css
├── CSInterface.js          ⬅️ Download this!
├── server.py               ⬅️ For local testing
├── CEPEXT/
│   └── manifest.xml        ⬅️ Adobe CEP config
└── js/
    ├── main.js
    ├── core/
    │   ├── app.js
    │   ├── dom.js
    │   └── state.js
    ├── ui/
    │   ├── controls.js
    │   ├── themes.js
    │   └── modals.js
    ├── services/
    │   ├── storage.js
    │   ├── indexedDB.js
    │   └── cep.js
    ├── modules/
    │   ├── media.js
    │   └── history.js
    └── utils/
        ├── helpers.js
        └── Transform.js
```

### 2. **MIME Type Error** ✅
The error `Failed to load module script: The server responded with a non-JavaScript MIME type` happens because:
- Your server wasn't sending the correct `Content-Type: text/javascript` header
- ES6 modules require proper MIME types

**Solution:** Use the included `server.py` script which sets correct MIME types.

### 3. **Adobe API Error** ⚠️
The `cc-api-data.adobe.io/ingest/v1` error is because:
- This is an Adobe CEP extension (for Photoshop/After Effects/etc.)
- `CSInterface.js` is missing or not loading
- The extension needs to run inside Adobe software OR with proper testing setup

---

## 🚀 How to Run This

### Option 1: For Local Testing (Recommended)

1. **Download CSInterface.js** (REQUIRED):
   - Go to: https://raw.githubusercontent.com/Adobe-CEP/CEP-Resources/master/CEP_11.x/CSInterface.js
   - Right-click → Save As → Save to project root (replace placeholder file)

2. **Run the server**:
   ```bash
   python3 server.py
   ```
   Or on Windows:
   ```bash
   python server.py
   ```

3. **Open in browser**:
   ```
   http://localhost:8000
   ```

### Option 2: For Adobe CEP Development

1. **Install Adobe Extension**:
   - Copy this entire folder to:
     - **Mac**: `~/Library/Application Support/Adobe/CEP/extensions/`
     - **Windows**: `C:\Users\[YourUsername]\AppData\Roaming\Adobe\CEP\extensions\`

2. **Enable debugging**:
   - Create a file called `.debug` in the extension folder
   - Or set registry keys (see Adobe CEP documentation)

3. **Launch from Adobe app**:
   - Open Photoshop/After Effects/etc.
   - Go to Window → Extensions → GIF Preview

---

## 🐛 Troubleshooting

### Still getting MIME type errors?

**If using other servers:**

**Node.js (http-server):**
```bash
npm install -g http-server
http-server -c-1
```

**Node.js (live-server):**
```bash
npm install -g live-server
live-server
```

**VS Code Live Server:**
- Install "Live Server" extension
- Right-click `index.html` → Open with Live Server

### Can't access Adobe API?

This is normal! The Adobe API errors will appear unless you're running inside actual Adobe software. For local testing, the preview functionality should still work.

### Browser console shows module errors?

Make sure:
1. You're using a web server (not opening files directly with `file://`)
2. All files are in the correct folders as shown above
3. Your browser supports ES6 modules (Chrome, Firefox, Safari, Edge - all modern versions)

---

## 📝 Additional Notes

### Why was the structure wrong?

Your `main.js` imports from `./core/app.js`:
```javascript
import { initApp } from './core/app.js';
```

This means the browser looks for: `js/core/app.js`

But all your files were in the root, so the browser couldn't find them!

### About CSInterface.js

This is Adobe's library for CEP extensions. It's NOT included by default because:
- It's ~200KB and changes with Adobe updates
- Adobe hosts it in their official GitHub repo
- Extensions should always use the latest version

### About the Adobe API error

The extension tries to connect to `cc-api-data.adobe.io` which is only accessible:
- Inside Adobe applications (Photoshop, After Effects, etc.)
- With proper Adobe authentication
- When the CEP environment is properly configured

For local browser testing, you can ignore this error - the media preview will still work!

---

## 🆘 Still Need Help?

If errors persist:

1. **Check browser console** (F12) for detailed error messages
2. **Verify folder structure** matches the diagram above exactly
3. **Make sure you downloaded** the real CSInterface.js
4. **Try different browsers** (Chrome recommended for development)
5. **Check file permissions** (especially on Mac/Linux)

---

## ✨ What This Extension Does

- Previews GIFs, images, and videos
- Pan, zoom, and fit controls
- Video playback with volume control
- History of recent media
- Multiple theme options
- IndexedDB storage for large files
- Designed for Adobe Creative Cloud apps

---

**Version:** 3.0  
**Authors:** Tom & Jay  
**Type:** Adobe CEP Extension  
