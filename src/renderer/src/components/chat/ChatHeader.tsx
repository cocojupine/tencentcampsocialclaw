import { MoreHorizontal, Phone, Search, Users, Video } from 'lucide-react'
import type { Conversation } from '../../types/chat'

type ChatHeaderProps = {
  conversation: Conversation
}

export function ChatHeader({ conversation }: ChatHeaderProps): React.JSX.Element {
  return (
    <header className="flex h-[88px] shrink-0 items-center justify-between border-b border-[#e7ebf3] bg-white/80 px-8 backdrop-blur-md">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="truncate text-[24px] font-semibold tracking-[0.01em] text-slate-900">
            {conversation.name}
          </h1>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-400" />
            1818 人在线
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400">讨论周边、展会、拼团和本周末的线下行程</p>
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
