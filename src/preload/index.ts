import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

type QClawHistoryItem = {
  author: string
  role: 'user' | 'qclaw' | 'system'
  content: string
}

type QClawPayload = {
  scenarioId: 'team-up' | 'spoiler-thread' | 'standee-group-buy'
  message: string
  history: QClawHistoryItem[]
  trackedCards?: any[]
}

type QClawResult = {
  success: boolean
  response?: string
  error?: string
}

type QClawConfigResult = {
  enabled: boolean
  hasApiKey: boolean
  model: string
}

const qclawApi = {
  chat: (payload: QClawPayload): Promise<QClawResult> =>
    electronAPI.ipcRenderer.invoke('qclaw:chat', payload),
  getConfig: (): Promise<QClawConfigResult> =>
    electronAPI.ipcRenderer.invoke('qclaw:getConfig')
}

const api = { qclaw: qclawApi }

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
