import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'

import { oauth2Window } from './electron-window.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __rendername = path.join(__dirname, '../dist/renderer')

let mainWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    width: 1000,
    height: 800,
    // icon: path.join(__dirname, 'src/common/assets/ico/nonghyup.ico'),
    title: 'health boosting',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // 보안을 위해 컨텍스트 격리 활성화
      nodeIntegration: false, // 보안을 위해 노드 통합 비활성화
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__rendername, '/index.html'))
  }

  ipcMain.handle('oauth2:open', (e, oauth2Url) => {
    oauth2Window(mainWindow, oauth2Url)
  })
}

app.whenReady().then(() => {
  createWindow() // 먼저 화면 띄우고
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
