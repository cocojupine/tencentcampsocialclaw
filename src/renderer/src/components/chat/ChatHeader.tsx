import { MoreHorizontal, Phone, Search, Users, Video } from 'lucide-react'
import type { Conversation, Scenario } from '../../types/chat'

type ChatHeaderProps = {
  conversation: Conversation
  scenario: Scenario
}

export function ChatHeader({ conversation, scenario }: ChatHeaderProps): React.JSX.Element {
  return (
    <header className="flex h-[88px] shrink-0 items-center justify-between border-b border-[#e7ebf3] bg-white/80 px-8 backdrop-blur-md">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="truncate text-[24px] font-semibold tracking-[0.01em] text-slate-900">
            {conversation.name}
          </h1>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-400" />
            静态原型演示中
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400">
          {conversation.description ?? '用于展示龙虾如何把一句容易沉底的话变成可被响应的社交结构。'}
        </p>
        <p className="mt-1 text-xs text-slate-300">当前叙事焦点：{scenario.summary}</p>
      </div>

      <div className="flex items-center gap-2 text-slate-500">
        {[Phone, Video, Search, Users].map((Icon, index) => (
          <button
            key={`${conversation.id}-${index}`}
            className="flex h-10 w-10 items-center justify-center rounded-2xl transition hover:bg-[#f1f4f8] hover:text-slate-800"
            type="button"
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
        <button
          className="ml-1 flex h-10 w-10 items-center justify-center rounded-2xl transition hover:bg-[#f1f4f8] hover:text-slate-800"
          type="button"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
