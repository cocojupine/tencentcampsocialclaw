import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      qclaw: {
        chat: (payload: {
          scenarioId: 'team-up' | 'spoiler-thread' | 'standee-group-buy'
          message: string
          history: Array<{ author: string; role: 'user' | 'qclaw' | 'system'; content: string }>
          trackedCards?: any[]
        }) => Promise<{ success: boolean; response?: string; error?: string }>
        getConfig: () => Promise<{ enabled: boolean; hasApiKey: boolean; model: string }>
      }
    }
  }
}
