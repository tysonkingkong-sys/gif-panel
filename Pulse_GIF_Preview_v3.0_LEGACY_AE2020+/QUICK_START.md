# 🚀 QUICK START GUIDE

## ⚡ 3-Step Setup

### Step 1: Download CSInterface.js
```bash
# Click this link and save the file to the project root:
https://raw.githubusercontent.com/Adobe-CEP/CEP-Resources/master/CEP_11.x/CSInterface.js

# Or use curl (Mac/Linux):
curl -o CSInterface.js https://raw.githubusercontent.com/Adobe-CEP/CEP-Resources/master/CEP_11.x/CSInterface.js

# Or use PowerShell (Windows):
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Adobe-CEP/CEP-Resources/master/CEP_11.x/CSInterface.js" -OutFile "CSInterface.js"
```

### Step 2: Start the Server
```bash
# Using Python 3:
python3 server.py

# Or Python 2:
python server.py

# Or if you have Node.js:
npx http-server -c-1
```

### Step 3: Open in Browser
```
http://localhost:8000
```

---

## ✅ Success Checklist

- [ ] CSInterface.js downloaded (not the placeholder)
- [ ] Server running on port 8000
- [ ] Browser shows the app (not errors)
- [ ] Can drag and drop images/videos
- [ ] No MIME type errors in console

---

## 🚨 Common Errors & Fixes

### "Failed to load module script"
**Problem:** Wrong MIME type  
**Fix:** Use `server.py` or another proper web server (not file://)

### "Cannot find module './core/app.js'"
**Problem:** Wrong folder structure  
**Fix:** Make sure all files are in the correct folders (see README.md)

### "CSInterface is not defined"
**Problem:** CSInterface.js missing or not loading  
**Fix:** Download the real CSInterface.js (not the placeholder!)

### "ERR_NAME_NOT_RESOLVED cc-api-data.adobe.io"
**Problem:** Adobe API not accessible  
**Fix:** This is normal when testing in browser - ignore it or run inside Adobe app

---

## 📁 Your Project Structure Should Look Like:

```
gif-preview-fixed/
│
├── 📄 index.html
├── 🎨 style.css  
├── 🔧 CSInterface.js          ← Download this first!
├── 🐍 server.py                ← Run this to test
├── 📖 README.md
├── ⚡ QUICK_START.md          ← You are here
│
├── 📂 CEPEXT/
│   └── manifest.xml
│
└── 📂 js/
    ├── main.js
    ├── 📂 core/         (app.js, dom.js, state.js)
    ├── 📂 ui/           (controls.js, themes.js, modals.js)
    ├── 📂 services/     (storage.js, indexedDB.js, cep.js)
    ├── 📂 modules/      (media.js, history.js)
    └── 📂 utils/        (helpers.js, Transform.js)
```

---

## 💡 Pro Tips

1. **Use Chrome DevTools** (F12) to see what's failing
2. **Check the Network tab** to see if JS files are loading
3. **Verify MIME types** in Network tab (should be `text/javascript`)
4. **Test without Adobe** first in the browser
5. **Keep console open** to catch errors early

---

## 🎯 What Should Work Now

✅ App loads without errors  
✅ Can drag & drop media files  
✅ Pan, zoom, and fit controls work  
✅ Themes can be changed  
✅ Settings modal opens  
✅ History is saved (IndexedDB)  
✅ Video playback with audio controls  

⚠️ Adobe-specific features (like CEP integration) will only work inside Adobe apps

---

## 🆘 Still Stuck?

1. Double-check CSInterface.js is the REAL file (should be ~200KB, not 500 bytes)
2. Make sure server is running (check terminal)
3. Try a different browser (Chrome recommended)
4. Clear browser cache and reload (Ctrl+Shift+R)
5. Check file permissions (especially on Mac/Linux)

---

**Ready? Let's go! 🚀**

```bash
python3 server.py
```

Then open: **http://localhost:8000**
