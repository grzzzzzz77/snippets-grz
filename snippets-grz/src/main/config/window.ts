import { join } from 'path'
import { BrowserWindow, shell, screen } from 'electron'
import { is } from '@electron-toolkit/utils'
import url from 'node:url'

import icon from '../../../resources/icon.png?asset'

export function createWindow(): BrowserWindow {
  // Create the browser window.
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize
  const width = 500
  const mainWindow = new BrowserWindow({
    width,
    height: 500,
    x: screenWidth - width,
    y: 60,
    show: false,

    alwaysOnTop: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // mainWindow.webContents.openDevTools()
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/config/category/content')
  } else {
    mainWindow.loadURL(
      url.format({
        //编译后的文件
        pathname: join(__dirname, '../renderer/index.html'),
        //协议
        protocol: 'file',
        //protocol 后面需要两个/
        slashes: true,
        //hash 的值
        hash: 'config/category/content'
      })
    )
  }

  return mainWindow
}
