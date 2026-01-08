# 🔧 EXTENSION NOT SHOWING UP - TROUBLESHOOTING GUIDE

## ❓ Which version did you install?
- [ ] LEGACY (AE 2020-2021)
- [ ] MODERN (AE 2022+)

## ✅ Step-by-Step Checklist

### Step 1: Verify Folder Location

**Windows - Check this EXACT path:**
```
C:\Users\[YourUsername]\AppData\Roaming\Adobe\CEP\extensions\
```

**Mac - Check this EXACT path:**
```
~/Library/Application Support/Adobe/CEP/extensions/
```

**Important:**
- The folder should be named `Pulse_GIF_Preview_v3.0_LEGACY_AE2020+` (or MODERN)
- It should be INSIDE the `extensions` folder
- NOT in a subfolder

**Correct structure:**
```
extensions/
└── Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/
    ├── index.html
    ├── CSInterface.js
    ├── .debug
    ├── CEPEXT/
    │   └── manifest.xml
    └── js/
        └── ...
```

**Wrong structure:**
```
extensions/
└── SomeFolder/
    └── Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/  ← TOO DEEP!
```

---

### Step 2: Enable Debug Mode

**This is CRITICAL!** Unsigned extensions won't show up without debug mode.

**Windows:**
1. Navigate to the extracted folder
2. **Right-click** `enable-debug-mode.bat` → **Run as Administrator**
3. You should see "PlayerDebugMode enabled" messages

**Mac:**
1. Open Terminal
2. Navigate to folder: `cd ~/Library/Application\ Support/Adobe/CEP/extensions/Pulse_GIF_Preview_v3.0_LEGACY_AE2020+`
3. Run: `./enable-debug-mode.sh`

**Verify it worked:**

**Windows - Check Registry:**
```
1. Press Win+R
2. Type: regedit
3. Navigate to: HKEY_CURRENT_USER\Software\Adobe\CSXS.9
4. Look for: PlayerDebugMode = 1
5. Also check: CSXS.10, CSXS.11, CSXS.12
```

**Mac - Check Defaults:**
```bash
defaults read com.adobe.CSXS.9 PlayerDebugMode
# Should return: 1
```

---

### Step 3: Restart After Effects PROPERLY

**This is crucial:**
1. **Quit** After Effects (File → Quit)
2. **Wait 5 seconds**
3. **Check Task Manager** (Windows) or **Activity Monitor** (Mac)
   - Make sure "AfterFX.exe" or "After Effects" is NOT running
4. **Start After Effects** fresh

---

### Step 4: Check in the Right Place

In After Effects:
1. Go to: **Window** → **Extensions**
2. Look for:
   - **"Pulse GIF Preview (Legacy)"** (if you installed LEGACY)
   - **"Pulse GIF Preview (Modern)"** (if you installed MODERN)

**Still not there?** Continue below...

---

### Step 5: Check Your After Effects Version

**Find your AE version:**
1. Open After Effects
2. **Help** → **About After Effects**
3. Note the version number

**Match to correct extension:**
| AE Version | Use This Version |
|------------|------------------|
| 2020 (17.x) | LEGACY only |
| 2021 (18.x) | LEGACY only |
| 2022 (19.x) | MODERN (or LEGACY) |
| 2023 (23.x) | MODERN (or LEGACY) |
| 2024 (24.x) | MODERN (or LEGACY) |

---

### Step 6: Manual Debug Mode (If Script Failed)

**Windows - Manual Registry:**
```
1. Press Win+R → type: regedit
2. Navigate to: HKEY_CURRENT_USER\Software\Adobe

3. For AE 2020 - Create key: CSXS.9
   - Inside it: New → String Value
   - Name: PlayerDebugMode
   - Value: 1

4. For AE 2021 - Create key: CSXS.10
   - Same as above

5. For AE 2022+ - Create keys: CSXS.11 and CSXS.12
   - Same as above for each
```

**Mac - Manual Defaults:**
```bash
# Run ALL of these:
defaults write com.adobe.CSXS.9 PlayerDebugMode 1
defaults write com.adobe.CSXS.10 PlayerDebugMode 1
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
defaults write com.adobe.CSXS.12 PlayerDebugMode 1
```

---

### Step 7: Check the .debug File

Navigate to your extension folder and verify `.debug` file exists:

**Windows:**
```
C:\Users\[You]\AppData\Roaming\Adobe\CEP\extensions\Pulse_GIF_Preview_v3.0_LEGACY_AE2020+\.debug
```

**Mac:**
```
~/Library/Application Support/Adobe/CEP/extensions/Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/.debug
```

**Important:** On Mac, files starting with `.` are hidden by default!

**To see hidden files on Mac:**
- In Finder, press: `Cmd + Shift + .` (period)

---

### Step 8: Common Issues

#### Issue: "extensions" folder doesn't exist
**Solution:** Create it!
```
Windows: C:\Users\[You]\AppData\Roaming\Adobe\CEP\extensions
Mac: ~/Library/Application Support/Adobe/CEP/extensions
```

#### Issue: Can't find AppData folder (Windows)
**Solution:**
1. Press Win+R
2. Type: `%appdata%\Adobe\CEP\extensions`
3. Press Enter

#### Issue: Can't find Library folder (Mac)
**Solution:**
1. In Finder, press: Cmd+Shift+G
2. Type: `~/Library/Application Support/Adobe/CEP/extensions`
3. Press Go

#### Issue: Wrong AE version
**Solution:**
- If you have AE 2020/2021, you MUST use LEGACY
- If you used MODERN with AE 2020/2021, it won't work - switch to LEGACY

---

### Step 9: Advanced Diagnostics

**Check CEP log files:**

**Windows:**
```
C:\Users\[You]\AppData\Local\Temp\cep_logs\
```

**Mac:**
```
~/Library/Logs/CSXS/
```

Look for error messages about your extension.

---

### Step 10: Nuclear Option - Complete Reinstall

1. **Remove extension folder completely**
2. **Clear CEP cache:**
   - Windows: Delete `C:\Users\[You]\AppData\Local\Temp\cep_*`
   - Mac: Delete `~/Library/Caches/CSXS/`
3. **Re-enable debug mode**
4. **Extract extension again**
5. **Restart AE**

---

## 🆘 Still Not Working?

### Provide this information:

1. **Your After Effects version:**
   - Example: "After Effects 2024 (version 24.1)"

2. **Which version you installed:**
   - LEGACY or MODERN?

3. **Folder location:**
   - Exact path where you put the extension

4. **Debug mode status:**
   - Did the script run successfully?
   - Can you verify PlayerDebugMode=1 in registry/defaults?

5. **Have you restarted AE?**
   - Did you fully quit and restart?

6. **Operating System:**
   - Windows 10/11 or Mac?

7. **Any error messages?**
   - Check CEP logs for errors

---

## 💡 Quick Fixes That Often Work

1. **Run the debug mode script again** (as Administrator on Windows)
2. **Restart AE again** (make sure it fully quits)
3. **Try the other version** (if you used MODERN, try LEGACY)
4. **Check folder name** - must match exactly, no extra folders
5. **Verify CSInterface.js is present** and is ~42KB (not empty)

---

## ✅ Success Checklist

Once working, you should see:
- [ ] Extension appears in Window → Extensions menu
- [ ] Clicking it opens the panel
- [ ] Panel shows "Upload Media here" placeholder
- [ ] Can drag and drop images/videos

---

**Let me know which step you're stuck on and I can help further!**
