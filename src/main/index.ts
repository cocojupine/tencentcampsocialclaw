import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import * as dotenv from 'dotenv'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { runQClawChat, type QClawChatPayload } from './qclaw'
import icon from '../../resources/icon.png?asset'

dotenv.config()

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  console.log('--- QClaw Main Process Started ---')
  console.log('Environment loaded from .env')

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('qclaw:chat', async (event, payload: QClawChatPayload) => {
    console.log('[IPC] qclaw:chat triggered', payload.scenarioId, payload.message)
    try {
      const isStreamRequested = (payload as any).stream === true

      if (isStreamRequested) {
        const requestId = (payload as any).requestId || Date.now().toString()
        const response = await runQClawChat(payload, (token) => {
          event.sender.send(`qclaw:token:${requestId}`, token)
        })
        return { success: true, response }
      } else {
        const response = await runQClawChat(payload)
        console.log('[IPC] qclaw:chat response received:', response.slice(0, 50) + '...')
        return { success: true, response }
      }
    } catch (error) {
      console.error('[IPC] qclaw:chat error:', error)
      return { success: false, error: (error as any).message || 'Unknown IPC error' }
    }
  })

  ipcMain.handle('qclaw:getConfig', () => {
    const hasApiKey = Boolean(process.env.DASHSCOPE_API_KEY)
    return {
      enabled: hasApiKey,
      hasApiKey,
      model: process.env.QCLAW_MODEL || 'qwen3.5-flash'
    }
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})