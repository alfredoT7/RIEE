import { app, shell, BrowserWindow, ipcMain, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

console.log('🚀 Main process starting...')
console.log('is.dev:', is.dev)

function getAppIcon() {
  console.log('📍 getAppIcon() called')
  try {
    // Use a safe path that doesn't require import
    const iconPath = join(__dirname, '../../resources/icon.png')
    console.log('📍 Trying icon path:', iconPath)
    const appIcon = nativeImage.createFromPath(iconPath)
    console.log('✅ Icon loaded successfully')
    return appIcon
  } catch (error) {
    console.error('❌ Error loading icon:', error.message)
    // Return empty nativeImage instead of crashing
    return nativeImage.createEmpty()
  }
}

function configureMacAppAppearance() {
  if (process.platform !== 'darwin') {
    return
  }

  const appIcon = getAppIcon()

  app.setName('RIEE')

  if (!appIcon.isEmpty()) {
    app.dock.setIcon(appIcon)
  }
}

function createWindow() {
  console.log('📍 createWindow() started')
  const appIcon = getAppIcon()
  console.log('📍 Got app icon')

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    fullscreen: false,
    resizable: true,
    maximizable: true,
    movable: false,
    show: false,
    autoHideMenuBar: true,
    icon: appIcon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  console.log('📍 BrowserWindow created')

  mainWindow.on('ready-to-show', () => {
    console.log('✅ ready-to-show event fired')
    mainWindow.maximize()
    mainWindow.setIcon(appIcon)
    mainWindow.setResizable(false)
    mainWindow.setMaximizable(false)
    mainWindow.setMovable(false)
    mainWindow.show()
  })
  
  // Debug: log when window is created
  console.log('🔧 Main window created, loading URL')
  
  // Debug: Listen for errors
  mainWindow.webContents.on('did-fail-load', (error) => {
    console.error('❌ Failed to load:', error)
  })
  
  mainWindow.webContents.on('crashed', () => {
    console.error('❌ Renderer process crashed')
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log('🌐 Loading dev URL:', process.env['ELECTRON_RENDERER_URL'])
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    console.log('📄 Loading production HTML file from:', join(__dirname, '../renderer/index.html'))
    console.log('is.dev:', is.dev, '| ELECTRON_RENDERER_URL:', process.env['ELECTRON_RENDERER_URL'])
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  
  console.log('📍 createWindow() finished')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log('✅ app.whenReady() fired')
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.consultorio.riee')
  configureMacAppAppearance()

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('app:quit', () => app.quit())

  console.log('🔨 About to call createWindow()')
  createWindow()
  console.log('✅ createWindow() called')

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}).catch((err) => {
  console.error('❌ Error in app.whenReady():', err)
  process.exit(1)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
