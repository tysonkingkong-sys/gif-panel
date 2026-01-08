# 🐛 CEP Extension Debugging Guide

Complete guide for debugging the Pulse GIF Preview extension in After Effects 2020+.

## Table of Contents
- [Quick Debug Setup](#quick-debug-setup)
- [Chrome DevTools Debugging](#chrome-devtools-debugging)
- [Server MIME Type Debugging](#server-mime-type-debugging)
- [Common Debugging Scenarios](#common-debugging-scenarios)
- [Debugging Tools Reference](#debugging-tools-reference)

## Quick Debug Setup

### 1. Enable Debug Mode (One-Time Setup)

#### Windows
```batch
# Run as Administrator
cd Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
enable-debug-mode.bat
```

#### Mac/Linux
```bash
cd Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
chmod +x enable-debug-mode.sh
./enable-debug-mode.sh
```

**What this does:**
- Sets `PlayerDebugMode = 1` for CSXS.9, 10, 11, 12
- Allows unsigned extensions to load
- Enables remote debugging capabilities

### 2. Verify Debug Configuration

Check that `.debug` file exists in extension folder:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ExtensionList>
  <Extension Id="com.pulse.gifpreview.legacy.panel">
    <HostList>
      <Host Name="AEFT" Port="8092"/>
    </HostList>
  </Extension>
</ExtensionList>
```

**Key settings:**
- **Host Name**: `AEFT` (After Effects identifier)
- **Port**: `8092` (debug port for this extension)

## Chrome DevTools Debugging

### Connecting to the Extension

1. **Install and open the extension in After Effects**
   - Window → Extensions → Pulse GIF Preview (Legacy)

2. **Open Chrome browser**

3. **Navigate to the debug port:**
   ```
   http://localhost:8092
   ```

4. **Chrome DevTools will open** connected to your extension

### What You Can Debug

#### Console Tab
- JavaScript errors and warnings
- `console.log()` output
- Exception stack traces
- Network errors

**Example debugging code:**
```javascript
console.log('🚀 App initialization starting...');
console.error('❌ Failed to load:', error);
console.warn('⚠️ Deprecated function used');
```

#### Sources Tab
- Set breakpoints in JavaScript files
- Step through code execution
- Inspect variable values
- Watch expressions

**To set a breakpoint:**
1. Sources tab → Navigate to JS file
2. Click line number to set breakpoint
3. Trigger the functionality
4. Execution pauses at breakpoint

#### Network Tab
- Monitor all HTTP requests
- Check response headers
- Verify MIME types
- Debug CORS issues

**What to look for:**
- Status codes (200 = OK, 404 = Not Found, etc.)
- Response headers: `Content-Type: text/javascript`
- Request timing
- Failed requests (shown in red)

#### Elements Tab
- Inspect DOM structure
- Modify HTML/CSS in real-time
- Check computed styles
- Debug layout issues

#### Application Tab
- IndexedDB storage
- LocalStorage
- Session storage
- Cache information

### Debugging Workflow Example

**Scenario: Extension loads but GIF doesn't display**

1. **Check Console for errors:**
   ```
   http://localhost:8092
   → Console tab
   → Look for red error messages
   ```

2. **Check Network for failed requests:**
   ```
   → Network tab
   → Reload extension
   → Look for failed requests (red)
   → Click failed request → Check why it failed
   ```

3. **Inspect DOM to see if image element exists:**
   ```
   → Elements tab
   → Find <img id="gif" class="gif">
   → Check if src attribute is set
   → Check computed styles (display: none?)
   ```

4. **Set breakpoint in media loading code:**
   ```
   → Sources tab
   → Open js/modules/media.js
   → Set breakpoint in handleMediaLoad function
   → Drag and drop a GIF
   → Step through code
   ```

## Server MIME Type Debugging

### Why MIME Types Matter

CEP extensions running locally or ES6 modules REQUIRE proper MIME types:

```
Content-Type: text/javascript; charset=utf-8
```

If the server sends:
```
Content-Type: text/plain
```

You'll get:
```
❌ Failed to load module script: The server responded with a non-JavaScript MIME type
```

### Using the Included Development Server

The `server.py` script is configured with correct MIME types:

```bash
cd Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
python3 server.py
```

**What it does:**
- Sets `Content-Type: text/javascript` for .js and .mjs files
- Adds CORS headers for local development
- Serves files from current directory
- Runs on port 8000

### Testing MIME Types

1. **Start the server:**
   ```bash
   python3 server.py
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

3. **Open DevTools (F12) → Network tab**

4. **Reload the page**

5. **Click on any .js file**

6. **Check Response Headers:**
   ```
   Content-Type: text/javascript; charset=utf-8  ✅
   ```

### Alternative Servers (if Python not available)

**Node.js http-server:**
```bash
npm install -g http-server
http-server -c-1 --cors
```

**Node.js live-server:**
```bash
npm install -g live-server
live-server
```

**VS Code Live Server:**
- Install "Live Server" extension
- Right-click index.html → Open with Live Server

## Common Debugging Scenarios

### Scenario 1: Extension Doesn't Show Up

**Debug steps:**
1. Verify debug mode enabled:
   ```bash
   # Windows (PowerShell)
   Get-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.9" -Name PlayerDebugMode
   
   # Mac
   defaults read com.adobe.CSXS.9 PlayerDebugMode
   ```
   Should return: `1`

2. Check CEP logs:
   - **Windows**: `C:\Users\[You]\AppData\Local\Temp\cep_logs\`
   - **Mac**: `~/Library/Logs/CSXS/`

3. Verify folder structure:
   ```
   extensions/Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/
   ├── .debug
   ├── CSXS/
   │   └── manifest.xml
   └── index.html
   ```

### Scenario 2: JavaScript Errors in Console

**Debug steps:**
1. Connect DevTools: `http://localhost:8092`
2. Read the error message carefully
3. Check file name and line number
4. Common errors:
   - `undefined is not a function` → Check function exists
   - `Cannot read property 'X' of undefined` → Object doesn't exist
   - `MIME type error` → Use server.py

### Scenario 3: CORS or File Access Errors

**Debug steps:**
1. Check manifest.xml has CEF parameters:
   ```xml
   <CEFCommandLine>
     <Parameter>--enable-nodejs</Parameter>
     <Parameter>--allow-file-access-from-files</Parameter>
     <Parameter>--allow-file-access</Parameter>
     <Parameter>--mixed-context</Parameter>
   </CEFCommandLine>
   ```

2. For local testing, use server.py (not file:// URLs)

### Scenario 4: Features Work in Browser, Not in AE

**Likely causes:**
- CSInterface.js not loaded properly
- Using browser APIs not available in CEP
- Chrome version differences (CEP 9.x = Chrome 74)

**Debug steps:**
1. Check if CSInterface.js is loaded:
   ```javascript
   console.log(typeof CSInterface); // Should be "function"
   ```

2. Check Chrome version in CEP:
   ```javascript
   console.log(navigator.userAgent);
   // Should show Chrome/74.x for CEP 9.x
   ```

3. Avoid features not in Chrome 74:
   - ❌ ES6 modules (import/export)
   - ❌ Optional chaining (`?.`)
   - ❌ Nullish coalescing (`??`)
   - ✅ const/let, arrow functions, async/await

## Debugging Tools Reference

### Port Configuration

| Extension | Debug Port |
|-----------|------------|
| Pulse GIF Preview | 8092 |

### Debug URLs

| Purpose | URL |
|---------|-----|
| Remote debugging | http://localhost:8092 |
| Local testing server | http://localhost:8000 |

### CEP Log Locations

| OS | Path |
|----|------|
| Windows | `C:\Users\[You]\AppData\Local\Temp\cep_logs\` |
| Mac | `~/Library/Logs/CSXS/` |

### Registry/Defaults Keys

| Version | Windows Registry | Mac Defaults |
|---------|------------------|--------------|
| CEP 9.x (AE 2020) | `HKCU\Software\Adobe\CSXS.9` | `com.adobe.CSXS.9` |
| CEP 10.x (AE 2021) | `HKCU\Software\Adobe\CSXS.10` | `com.adobe.CSXS.10` |
| CEP 11.x (AE 2022-23) | `HKCU\Software\Adobe\CSXS.11` | `com.adobe.CSXS.11` |
| CEP 12.x (AE 2024) | `HKCU\Software\Adobe\CSXS.12` | `com.adobe.CSXS.12` |

### Useful Console Commands

```javascript
// Check if running in CEP
console.log(window.__adobe_cep__); // Should be defined

// Get CEP version
var csInterface = new CSInterface();
console.log(csInterface.getHostEnvironment());

// Get extension info
console.log(csInterface.getExtensionID());

// Trigger browser refresh
location.reload();

// Check all loaded scripts
console.log(document.scripts);
```

## Best Practices

### 1. Always Use Console Logging
```javascript
console.log('🧱 BOOT: Starting application...');
console.log('✅ IndexedDB initialized');
console.error('❌ Failed to load media:', error);
```

### 2. Use Breakpoints Instead of console.log for Complex Issues
- Pause execution
- Inspect variable state
- Step through code line by line

### 3. Test in Both Browser and CEP
- Browser: Quick iteration, better DevTools
- CEP: Real environment, actual Adobe integration

### 4. Clear Cache When Making Changes
```javascript
// In DevTools Console:
location.reload(true); // Hard reload

// Or right-click refresh button → Empty Cache and Hard Reload
```

### 5. Keep DevTools Open
- Catch errors as they happen
- Monitor network requests
- See console output in real-time

## Getting Help

If you're still stuck:

1. **Check documentation:**
   - `ERRORS_EXPLAINED.md`
   - `TROUBLESHOOTING_NOT_SHOWING_UP.md`
   - `AE2020_COMPATIBLE.md`

2. **Gather information:**
   - After Effects version
   - Extension version (LEGACY/MODERN)
   - Error messages from Console
   - Screenshot of issue
   - CEP log files

3. **Contact support:**
   - Discord: `@inyourrealm`
   - Include all information from step 2

---

**Happy Debugging! 🐛🔧**
