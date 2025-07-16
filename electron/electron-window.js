import { BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'

// let isDev = !app.isPackaged;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// const __rendername = path.join(__dirname, '../dist/renderer')

function oauth2Window(mainWindow, oauthUrl) {
  const authWindow = new BrowserWindow({
    width: 500,
    height: 600,
    parent: mainWindow,
    modal: true,
    show: true,
    title: 'OAUTH2 로그인',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // 보안을 위해 노드 통합 비활성화
    },
  })

  authWindow.loadURL(oauthUrl)

  // 창 닫기 감지
  authWindow.on('closed', () => {}) // 아무것도 하지 않음
}

export { oauth2Window }
