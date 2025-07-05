import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __rendername = path.join(__dirname, '../dist/renderer')

const createWindow = () => {
  const win = new BrowserWindow({
    fullscreen: false,
    width: 1000,
    height: 800,
    // icon: path.join(__dirname, 'src/common/assets/ico/nonghyup.ico'),
    title: 'health boosting',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__rendername, '/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
