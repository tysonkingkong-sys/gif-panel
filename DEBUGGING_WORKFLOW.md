# 🎨 CEP Extension Debugging Workflow

Visual guide to debugging the Pulse GIF Preview extension for After Effects 2020+.

## 📊 Debugging Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DEBUGGING WORKFLOW                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│  After Effects   │         │  Chrome Browser  │
│                  │         │                  │
│  ┌────────────┐  │         │  ┌────────────┐  │
│  │ Extension  │  │ Port    │  │  DevTools  │  │
│  │   Panel    │◄─┼─8092────┼─►│  Console   │  │
│  └────────────┘  │         │  │  Network   │  │
│                  │         │  │  Sources   │  │
└──────────────────┘         │  └────────────┘  │
                             └──────────────────┘

┌──────────────────┐         ┌──────────────────┐
│  Development     │         │  Local Testing   │
│  Server          │         │                  │
│  ┌────────────┐  │ Port    │  ┌────────────┐  │
│  │ server.py  │◄─┼─8000────┼─►│  Browser   │  │
│  │ MIME Types │  │         │  │  Testing   │  │
│  └────────────┘  │         │  └────────────┘  │
└──────────────────┘         └──────────────────┘
```

## 🔄 Development Cycle

```
┌─────────────┐
│   1. SETUP  │  Enable debug mode → Install extension
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 2. DEVELOP  │  Edit code → Test locally (server.py)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  3. DEBUG   │  Remote debugging → Chrome DevTools
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  4. VERIFY  │  Test in AE → Check console
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  5. DEPLOY  │  Distribute to users
└─────────────┘
```

## 🛠️ Setup Steps (Visual)

### Step 1: Enable Debug Mode

```
Windows:                           Mac:
┌──────────────────────┐          ┌──────────────────────┐
│ Right-click:         │          │ Terminal:            │
│ enable-debug-mode.bat│          │ ./enable-debug-mode.sh
│                      │          │                      │
│ → Run as Admin       │          │ Sets CSXS.9-12       │
│                      │          │ PlayerDebugMode = 1  │
│ Sets Registry keys:  │          └──────────────────────┘
│ CSXS.9-12           │
│ PlayerDebugMode = 1  │
└──────────────────────┘
```

### Step 2: Install Extension

```
Copy folder to:

Windows:
C:\Users\[You]\AppData\Roaming\Adobe\CEP\extensions\
└── Pulse_GIF_Preview_v3.0_LEGACY_AE2020+\
    ├── .debug          ← Port 8092
    ├── CSXS\
    │   └── manifest.xml
    ├── index.html
    └── js\...

Mac:
~/Library/Application Support/Adobe/CEP/extensions/
└── Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/
    ├── .debug          ← Port 8092
    ├── CSXS/
    │   └── manifest.xml
    ├── index.html
    └── js/...
```

### Step 3: Verify Installation

```
Run:                              Output:
┌──────────────────────┐         ┌──────────────────────┐
│ check-installation.sh│    →   │ ✅ index.html found  │
│                      │         │ ✅ CSInterface.js    │
│ Checks:              │         │ ✅ .debug file       │
│ - Debug mode         │         │ ✅ manifest.xml      │
│ - File structure     │         │ ✅ main.js           │
│ - AE running         │         └──────────────────────┘
└──────────────────────┘
```

## 🐛 Debugging Methods

### Method 1: Remote Debugging (After Effects)

```
┌─────────────────────────────────────────────┐
│  Step 1: Open extension in After Effects   │
│  Window → Extensions → Pulse GIF Preview    │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 2: Open Chrome                        │
│  Navigate to: http://localhost:8092         │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 3: Debug with Chrome DevTools         │
│  - Console: View errors, logs               │
│  - Sources: Set breakpoints                 │
│  - Network: Check requests                  │
│  - Elements: Inspect DOM                    │
└─────────────────────────────────────────────┘
```

### Method 2: Local Testing (Browser)

```
┌─────────────────────────────────────────────┐
│  Step 1: Start development server           │
│  $ python3 server.py                        │
│                                             │
│  ✅ MIME types: text/javascript             │
│  ✅ CORS enabled                            │
│  ✅ Cache disabled                          │
│  ✅ Request logging                         │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 2: Open in browser                    │
│  http://localhost:8000                      │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 3: Open DevTools (F12)                │
│  - Test UI functionality                    │
│  - Check MIME types                         │
│  - Verify JS loading                        │
└─────────────────────────────────────────────┘
```

## 📋 Common Debug Scenarios

### Scenario 1: Extension Not Showing

```
Problem:                      Solution:
┌──────────────────┐         ┌──────────────────┐
│ Extension menu   │    →    │ 1. Re-run debug  │
│ doesn't show     │         │    mode script   │
│ the extension    │         │                  │
└──────────────────┘         │ 2. Check folder  │
                             │    location      │
                             │                  │
                             │ 3. Restart AE    │
                             │    completely    │
                             └──────────────────┘
```

### Scenario 2: JavaScript Errors

```
Problem:                      Solution:
┌──────────────────┐         ┌──────────────────┐
│ Extension opens  │    →    │ 1. Open DevTools │
│ but shows errors │         │    (port 8092)   │
│                  │         │                  │
└──────────────────┘         │ 2. Check Console │
                             │    for errors    │
                             │                  │
                             │ 3. Check Network │
                             │    for failed    │
                             │    requests      │
                             └──────────────────┘
```

### Scenario 3: MIME Type Errors

```
Problem:                      Solution:
┌──────────────────┐         ┌──────────────────┐
│ "non-JavaScript  │    →    │ Use server.py:   │
│ MIME type"       │         │                  │
│ error            │         │ $ python3        │
│                  │         │   server.py      │
└──────────────────┘         │                  │
                             │ Serves correct   │
                             │ Content-Type     │
                             └──────────────────┘
```

## 🎯 Debug Checklist

```
Before debugging:
☐ Debug mode enabled (CSXS.9, 10, 11, 12)
☐ Extension installed in correct folder
☐ After Effects restarted completely
☐ Extension shows in Window → Extensions

During debugging:
☐ Chrome DevTools connected (port 8092)
☐ Console shows no red errors
☐ Network tab shows all files loaded (200 OK)
☐ JavaScript files have correct MIME type

After changes:
☐ Hard reload in DevTools (Ctrl+Shift+R)
☐ Or close/reopen extension panel
☐ Or restart After Effects
```

## 📊 Port Reference

```
Port 8092 → Remote debugging (Chrome DevTools)
             ├─ After Effects CEP extension
             └─ Full debugging capabilities

Port 8000 → Local testing server (server.py)
             ├─ Browser testing
             ├─ MIME type verification
             └─ Rapid development
```

## 🎨 DevTools Tabs Usage

```
Console Tab:
├─ JavaScript errors and warnings
├─ console.log() output
└─ Exception stack traces

Network Tab:
├─ HTTP requests and responses
├─ MIME type verification
├─ Failed requests (red)
└─ Request timing

Sources Tab:
├─ Set breakpoints
├─ Step through code
├─ Inspect variables
└─ Watch expressions

Elements Tab:
├─ Inspect DOM structure
├─ Modify HTML/CSS live
├─ Check computed styles
└─ Debug layout issues

Application Tab:
├─ IndexedDB storage
├─ LocalStorage data
├─ Session storage
└─ Cache information
```

## 🚀 Quick Commands

```bash
# Setup
./enable-debug-mode.sh       # Enable debugging
./check-installation.sh      # Verify setup

# Development
python3 server.py            # Start dev server
chmod +x *.sh                # Make scripts executable

# Debugging
# Remote: http://localhost:8092
# Local:  http://localhost:8000
```

## 📚 Documentation Tree

```
Main Documentation:
├── README.md                → Overview & quick start
├── INSTALLATION.md          → Step-by-step setup
├── DEBUGGING.md             → Comprehensive guide
├── QUICK_REFERENCE.md       → Quick commands
└── IMPLEMENTATION_SUMMARY.md → Technical details

Extension Documentation:
└── Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/
    ├── README.md                    → Extension info
    ├── ERRORS_EXPLAINED.md          → Error solutions
    ├── TROUBLESHOOTING_NOT_SHOWING_UP.md → Install issues
    ├── AE2020_COMPATIBLE.md         → Compatibility
    └── WHAT_WAS_FIXED.md            → Change history
```

## 💡 Pro Tips

1. **Always check Console first** - Most errors show there
2. **Use breakpoints** - More powerful than console.log
3. **Test locally first** - Faster iteration with server.py
4. **Clear cache often** - Ctrl+Shift+R in DevTools
5. **Keep DevTools open** - Catch errors in real-time

## 🎯 Success Indicators

```
✅ Extension shows in AE menu
✅ Panel opens without errors
✅ Chrome DevTools connects (port 8092)
✅ Console shows initialization messages
✅ Network tab shows all files loaded
✅ All features work (drag/drop, zoom, etc.)
```

---

**Happy Debugging! 🎉**

For detailed guides, see:
- DEBUGGING.md (comprehensive debugging)
- INSTALLATION.md (setup instructions)
- QUICK_REFERENCE.md (commands)
