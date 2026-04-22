import {
  FolderClosed,
  Image,
  Laugh,
  Mic,
  ScissorsLineDashed,
  SendHorizonal,
  Sticker,
  Upload
} from 'lucide-react'
import type { ScenarioId } from '../../types/chat'
import { ScenarioPanel } from './ScenarioPanel'

const toolbarIcons = [Laugh, ScissorsLineDashed, FolderClosed, Image, Upload, Mic, Sticker]

type MessageInputAreaProps = {
  activeScenarioId: ScenarioId
  scenarios: Array<{ id: ScenarioId; name: string }>
  onSelectScenario: (scenarioId: ScenarioId) => void
  onResetScenario: () => void
}

export function MessageInputArea({
  activeScenarioId,
  scenarios,
  onSelectScenario,
  onResetScenario
}: MessageInputAreaProps): React.JSX.Element {
  return (
    <section className="h-[208px] shrink-0 border-t border-[#e7ebf3] bg-white px-8 py-4">
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1d9bf0]">
              Scenario Panel
            </p>
            <p className="mt-1 text-sm text-slate-500">
              切换三个 PRD 核心场景，演示从私有建议到顶栏入口、再到贴内讨论与 @QClaw
              回应的完整路径。
            </p>
          </div>
          <ScenarioPanel
            activeScenarioId={activeScenarioId}
            scenarios={scenarios}
            onSelectScenario={onSelectScenario}
            onResetScenario={onResetScenario}
          />
        </div>

        <div className="mt-4 flex items-center gap-2 text-slate-500">
          {toolbarIcons.map((Icon, index) => (
            <button
              key={`toolbar-${index}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-[#f3f6fa] hover:text-slate-800"
              type="button"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        <div className="mt-3 flex min-h-0 flex-1 gap-4">
          <textarea
            className="min-h-0 flex-1 resize-none rounded-2xl border border-transparent bg-[#f7f9fc] px-4 py-3 text-[15px] leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#bfdbfe] focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
            placeholder="当前是静态原型：输入区仅用于还原 QQ 桌面端心智，不发送真实消息。"
          />

          <div className="flex w-[128px] shrink-0 items-end justify-end">
            <button
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-[#1d9bf0] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(29,155,240,0.24)] transition hover:bg-[#148be0]"
              type="button"
            >
              <SendHorizonal className="h-4 w-4" />
              发送
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
