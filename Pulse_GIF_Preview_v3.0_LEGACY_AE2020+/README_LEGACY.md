# 🔵 Pulse GIF Preview v3.0 - LEGACY Version

## For After Effects 2020-2021 (CEP 9.x, 10.x)

This is the **LEGACY** version designed for maximum compatibility with older After Effects versions.

---

## ✅ Compatibility

| After Effects | CEP | Chromium | Status |
|---------------|-----|----------|--------|
| AE 2020 (17.x) | 9.x | Chrome 74 | ✅ **Fully Compatible** |
| AE 2021 (18.x) | 10.x | Chrome 80 | ✅ **Fully Compatible** |
| AE 2022+ | 11.x+ | Chrome 94+ | ✅ Works (but Modern version recommended) |

---

## 🔧 Technical Details

### JavaScript Compatibility
- ✅ Traditional `<script>` tags (no ES6 modules)
- ✅ Global functions (window scope)
- ✅ No optional chaining (`?.`)
- ✅ No nullish coalescing (`??`)
- ✅ Compatible with Chrome 74+

### What's Included
All scripts load in dependency order:
```html
<script src="js/core/state.js"></script>
<script src="js/core/dom.js"></script>
<script src="js/utils/helpers.js"></script>
<script src="js/services/indexedDB.js"></script>
<!-- ... etc -->
```

---

## 📥 Installation

### Step 1: Copy Extension Folder

**Windows:**
```
C:\Users\[YourName]\AppData\Roaming\Adobe\CEP\extensions\
```

**Mac:**
```
~/Library/Application Support/Adobe/CEP/extensions/
```

Copy the **entire** `Pulse_GIF_Preview_v3.0_LEGACY_AE2020+` folder to this location.

### Step 2: Enable Debug Mode

**Windows:** Double-click `enable-debug-mode.bat`  
**Mac:** Run `./enable-debug-mode.sh` in Terminal

This enables debug mode for AE 2020, 2021, 2022, 2023, and 2024.

### Step 3: Restart After Effects

1. Quit After Effects completely
2. Reopen After Effects
3. Go to: **Window** → **Extensions** → **Pulse GIF Preview (Legacy)**

---

## ✨ Features

- ✅ Drag & drop images (PNG, JPG, GIF)
- ✅ Drag & drop videos (MP4, WebM, MOV)
- ✅ Zoom with mouse wheel
- ✅ Pan by clicking and dragging
- ✅ Fit / Fill / Stretch modes
- ✅ Video volume control
- ✅ Audio mute/unmute
- ✅ 10 color themes
- ✅ History tracking (IndexedDB - up to 5GB)
- ✅ Video thumbnail generation
- ✅ Settings persistence
- ✅ Fullscreen mode
- ✅ Rounded corners toggle

---

## 🎯 How to Use

1. **Open the extension** in After Effects
2. **Drag and drop** any image or video into the panel
3. **Zoom:** Mouse wheel
4. **Pan:** Click and drag
5. **Fit modes:** Click the arrows button (cycles: Fit → Fill → Stretch)
6. **Settings:** Click the gear icon
7. **History:** Open settings → History tab

---

## 🐛 Troubleshooting

### Extension doesn't load
- Verify debug mode is enabled (run the script again)
- Check CSInterface.js exists and is ~42KB
- Restart AE completely (quit, don't just close)

### "Failed to load module" error
- This means you're using the MODERN version by mistake
- You have the LEGACY version, so this shouldn't happen
- If you see this, reinstall from the LEGACY folder

### Blank screen
1. Right-click in extension → Inspect
2. Check Console tab for errors
3. Verify all files are in correct folders
4. Make sure `.debug` file exists

### Features don't work
1. Open DevTools (F12 in extension)
2. Check for JavaScript errors in Console
3. Verify IndexedDB initialized successfully

---

## 📊 What's Different from Modern Version?

| Feature | Legacy | Modern |
|---------|--------|--------|
| ES6 Modules | ❌ No | ✅ Yes |
| Optional Chaining | ❌ No | ✅ Yes |
| Code Organization | Global functions | Modular imports |
| Load Time | Slightly slower | Faster |
| Memory Usage | Higher | Lower |
| AE 2020 Support | ✅ Yes | ❌ No |
| AE 2022+ Support | ✅ Yes | ✅ Yes (recommended) |

---

## 🔍 Debugging

To see what's happening:

1. Right-click inside the extension
2. Click **Inspect** (opens Chrome DevTools)
3. Check the **Console** tab for messages

You should see:
```
✅ 🧱 BOOT: Starting application...
✅ 🚀 App initialization starting...
✅ ✅ IndexedDB initialized
✅ ✅ Storage initialized
✅ ✅ State restored
✅ ✅ Themes initialized
✅ ✅ Controls initialized
✅ 🎯 App initialization complete!
```

---

## 📝 Notes

- This version uses **traditional JavaScript** for compatibility
- All functions are **global** (attached to window object)
- Scripts load in **dependency order** via `<script>` tags
- **No ES6 modules** - this is intentional for CEP 9.x support
- Works perfectly in **AE 2020 and 2021**

---

## 🆘 Support

If you have issues:
1. Check the troubleshooting section above
2. Open DevTools and check Console for errors
3. Contact on Discord: **@inyourrealm**

---

**Enjoy your GIF previews! 🎬**
