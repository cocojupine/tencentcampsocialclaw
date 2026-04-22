import { ChevronRight, Pin } from 'lucide-react'
import type { AgentCard, Scenario } from '../../types/chat'

type PinnedEntryBarProps = {
  visible: boolean
  scenario: Scenario
  card: AgentCard
  threadOpen: boolean
  onOpen: () => void
}

export function PinnedEntryBar({
  visible,
  scenario,
  card,
  threadOpen,
  onOpen
}: PinnedEntryBarProps): React.JSX.Element {
  return (
    <div className="shrink-0 border-b border-[#edf1f6] bg-[#f8fbff] px-8 py-2.5">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <div className="rounded-full bg-[#e8f4ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1d9bf0]">
          置顶入口
        </div>
        {visible ? (
          <button
            className="flex flex-1 items-center justify-between rounded-[18px] border border-[#d7e7fb] bg-white px-4 py-2.5 text-left shadow-[0_6px_16px_rgba(59,130,246,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(59,130,246,0.12)]"
            onClick={onOpen}
            type="button"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white`}
              >
                <Pin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                    {scenario.thread.entry.pill}
                  </span>
                  <span className="text-[11px] text-slate-400">龙虾已挂起入口</span>
                </div>
                <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                  {scenario.thread.entry.label}
                </p>
                <p className="truncate text-xs text-slate-500">{scenario.thread.entry.summary}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-4">
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                {threadOpen ? '贴内已展开' : scenario.thread.statusPill}
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </button>
        ) : (
          <div className="flex-1 rounded-[18px] border border-dashed border-[#d9e7f6] bg-white/70 px-4 py-2.5 text-sm text-slate-400">
            先确认龙虾建议，贴子入口才会挂到顶栏。
          </div>
        )}
      </div>
    </div>
  )
}
