import { ipcMain, IpcMainInvokeEvent } from 'electron'
import * as query from './query'

type sqlType = 'findAll' | 'findOne' | 'insert' | 'update' | 'del' | 'config'

ipcMain.handle('sql', (_event: IpcMainInvokeEvent, sql: string, type: sqlType, params?: any) => {
  return query[type](sql, params)
})
