# 📦 Installation Guide for Pulse GIF Preview

Complete step-by-step installation guide for the Pulse GIF Preview CEP extension for After Effects 2020+.

## 📋 Prerequisites

- **Adobe After Effects 2020 or later** (versions 17.0 - 24.x)
- **Administrator/root access** (for enabling debug mode)
- **Python 3.x** (optional, for local testing)

## 🚀 Installation Steps

### Step 1: Locate CEP Extensions Folder

The extension must be installed in Adobe's CEP extensions directory.

#### Windows

```
C:\Users\[YourUsername]\AppData\Roaming\Adobe\CEP\extensions\
```

**Quick access:**
1. Press `Win + R`
2. Type: `%appdata%\Adobe\CEP\extensions`
3. Press Enter

#### Mac

```
~/Library/Application Support/Adobe/CEP/extensions/
```

**Quick access:**
1. In Finder, press `Cmd + Shift + G`
2. Type: `~/Library/Application Support/Adobe/CEP/extensions`
3. Press Go

**Note:** If the `extensions` folder doesn't exist, create it!

---

### Step 2: Install Extension

Copy the **entire** `Pulse_GIF_Preview_v3.0_LEGACY_AE2020+` folder to the extensions directory.

**Correct structure:**
```
extensions/
└── Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/
    ├── .debug
    ├── index.html
    ├── CSInterface.js
    ├── CSXS/
    │   └── manifest.xml
    ├── js/
    │   └── ... (all JS files)
    ├── server.py
    └── ... (other files)
```

**Wrong structure (don't do this):**
```
extensions/
└── SomeFolder/
    └── Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/  ← TOO DEEP!
```

---

### Step 3: Enable Debug Mode

**This is CRITICAL!** Unsigned extensions won't load without debug mode enabled.

#### Windows

1. Navigate to `Pulse_GIF_Preview_v3.0_LEGACY_AE2020+` folder
2. **Right-click** on `enable-debug-mode.bat`
3. Select **"Run as Administrator"**
4. You should see success messages for CSXS.9, 10, 11, and 12

#### Mac

```bash
cd ~/Library/Application\ Support/Adobe/CEP/extensions/Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
./enable-debug-mode.sh
```

**What this does:**
- Sets `PlayerDebugMode = 1` in Windows Registry or Mac defaults
- Enables debugging for all CEP versions (9, 10, 11, 12)
- Allows unsigned extensions to load

---

### Step 4: Verify Installation

Run the installation checker to verify everything is set up correctly.

#### Windows

```batch
cd C:\Users\[You]\AppData\Roaming\Adobe\CEP\extensions\Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
CHECK_INSTALLATION.bat
```

#### Mac

```bash
cd ~/Library/Application\ Support/Adobe/CEP/extensions/Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
./check-installation.sh
```

**What it checks:**
- ✅ Debug mode enabled for all CSXS versions
- ✅ All required files present (index.html, CSInterface.js, .debug, etc.)
- ✅ Correct folder structure (CSXS/manifest.xml)
- ✅ After Effects running status

---

### Step 5: Restart After Effects

**Important:** You must completely quit and restart After Effects!

1. **Quit** After Effects (File → Quit, or Cmd+Q / Alt+F4)
2. **Wait** 5 seconds to ensure it fully closes
3. **Verify** it's closed:
   - Windows: Check Task Manager for `AfterFX.exe`
   - Mac: Check Activity Monitor for "After Effects"
4. **Start** After Effects fresh

---

### Step 6: Open the Extension

1. In After Effects, go to **Window → Extensions**
2. Click **Pulse GIF Preview (Legacy)**
3. The extension panel should open!

---

## ✅ Verification Checklist

After installation, verify these:

- [ ] Extension folder in correct location
- [ ] Debug mode enabled (run enable-debug-mode script)
- [ ] All files present (run check-installation script)
- [ ] After Effects fully restarted
- [ ] Extension appears in Window → Extensions menu
- [ ] Extension panel opens without errors
- [ ] Can drag and drop media files
- [ ] Console shows no errors (F12 or Chrome remote debugging)

---

## 🐛 Troubleshooting

### Extension Not Appearing in Menu?

**Solution 1: Re-enable Debug Mode**
```bash
# Run the script again as Administrator
enable-debug-mode.bat  # Windows
./enable-debug-mode.sh  # Mac
```

**Solution 2: Verify Folder Location**
- Must be directly in `extensions/` folder
- Not in a subfolder
- Folder name must be exact: `Pulse_GIF_Preview_v3.0_LEGACY_AE2020+`

**Solution 3: Check Registry/Defaults**

Windows (PowerShell):
```powershell
Get-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.9" -Name PlayerDebugMode
# Should return: PlayerDebugMode : 1
```

Mac:
```bash
defaults read com.adobe.CSXS.9 PlayerDebugMode
# Should return: 1
```

**Solution 4: Clear CEP Cache**

Windows:
```
Delete: C:\Users\[You]\AppData\Local\Temp\cep_*
```

Mac:
```bash
rm -rf ~/Library/Caches/CSXS/
```

Then restart After Effects.

---

### Extension Opens But Shows Errors?

**Check Console:**
1. Right-click in extension panel
2. Select **"Inspect"** or **"Debug"**
3. Chrome DevTools will open
4. Check Console tab for error messages

**Or use Remote Debugging:**
```
http://localhost:8092
```

**Common Issues:**
- Missing JavaScript files → Re-extract/copy extension
- CSInterface errors → CSInterface.js file is present and ~42KB?
- MIME type errors → Use `server.py` for local testing

---

### Features Not Working?

**Clear Browser Cache in CEP:**
1. Right-click in extension
2. Inspect/Debug
3. In DevTools: Right-click Reload → Empty Cache and Hard Reload

**Or:**
- Close extension panel
- Reopen it

---

## 🔧 Advanced Installation

### Manual Debug Mode Setup

If the script doesn't work, set debug mode manually:

#### Windows (Registry Editor)

1. Press `Win + R`, type `regedit`, press Enter
2. Navigate to: `HKEY_CURRENT_USER\Software\Adobe`
3. For each CSXS version (9, 10, 11, 12):
   - Create key: `CSXS.X` (if doesn't exist)
   - Inside it: New → String Value
   - Name: `PlayerDebugMode`
   - Value: `1`

#### Mac (Terminal)

```bash
defaults write com.adobe.CSXS.9 PlayerDebugMode 1
defaults write com.adobe.CSXS.10 PlayerDebugMode 1
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
defaults write com.adobe.CSXS.12 PlayerDebugMode 1
```

---

### Installation for Multiple After Effects Versions

If you have multiple AE versions installed:

1. Install extension once (in extensions folder)
2. Enable debug mode for all CSXS versions (script does this automatically)
3. Extension will work in all compatible AE versions

**Compatibility:**
- AE 2020 (17.x) → CSXS.9
- AE 2021 (18.x) → CSXS.10
- AE 2022-2023 (19.x-23.x) → CSXS.11
- AE 2024 (24.x) → CSXS.12

---

## 📚 Next Steps

After successful installation:

1. **Read the documentation:**
   - `README.md` - Overview and features
   - `DEBUGGING.md` - Debugging guide
   - `QUICK_REFERENCE.md` - Quick commands

2. **Test the extension:**
   - Drag and drop a GIF
   - Try zoom/pan controls
   - Change themes in Settings
   - Check history tab

3. **Enable debugging (optional):**
   - Open Chrome: `http://localhost:8092`
   - Use Chrome DevTools for debugging

4. **Local testing (optional):**
   ```bash
   python3 server.py
   # Open http://localhost:8000
   ```

---

## 💬 Support

If you encounter issues:

1. **Check the documentation:**
   - `ERRORS_EXPLAINED.md` - Common errors
   - `TROUBLESHOOTING_NOT_SHOWING_UP.md` - Visibility issues
   - `DEBUGGING.md` - Debugging techniques

2. **Run diagnostics:**
   - `check-installation.bat/sh` - Verify installation
   - Check CEP logs (see DEBUGGING.md)
   - Check Console in DevTools

3. **Contact support:**
   - Discord: `@inyourrealm`
   - Include: AE version, error messages, screenshots

---

## 🎉 Success!

Once installed, you should see:
- ✅ Extension in Window → Extensions menu
- ✅ Panel opens without errors
- ✅ "Upload Media here" placeholder
- ✅ Can drag and drop GIFs/images/videos
- ✅ All controls working (zoom, pan, settings)

**Enjoy using Pulse GIF Preview!** 🚀
