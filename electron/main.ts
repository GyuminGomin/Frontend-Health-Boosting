import { app, BrowserWindow } from 'electron'
import path from 'path'

const createWindow = () => {
  const win = new BrowserWindow({
    fullscreen: true,
    width: 1000,
    height: 800,
    // icon: path.join(__dirname, 'src/common/assets/ico/nonghyup.ico'),
    title: 'health boosting',
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts'),
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
