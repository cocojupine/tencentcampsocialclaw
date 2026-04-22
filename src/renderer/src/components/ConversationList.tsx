import { Plus, Search, VolumeX } from 'lucide-react'
import type { Conversation } from '../types/chat'

type ConversationListProps = {
  conversations: Conversation[]
  selectedConversationId: string
  onSelectConversation: (conversationId: string) => void
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation
}: ConversationListProps): React.JSX.Element {
  return (
    <section className="flex w-[300px] min-w-[300px] flex-col border-r border-[#eef1f6] bg-[#f8fafc]">
      <div className="border-b border-[#eef1f6] px-5 pb-4 pt-5">
        <div className="flex items-center gap-3">
          <label className="group flex h-10 flex-1 items-center gap-2 rounded-2xl border border-transparent bg-[#eef2f7] px-3 text-sm text-slate-500 transition focus-within:border-[#b6d8ff] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="搜索"
            />
          </label>
          <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef2f7] text-slate-500 transition hover:bg-[#e4e9f1] hover:text-slate-700">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-1">
          {conversations.map((conversation) => {
            const active = conversation.id === selectedConversationId

            return (
              <button
                key={conversation.id}
                className={[
                  'flex w-full items-start gap-3 rounded-[20px] px-3 py-3 text-left transition-all duration-200',
                  active
                    ? 'bg-[#1d9bf0] text-white shadow-[0_12px_24px_rgba(29,155,240,0.22)]'
                    : 'hover:bg-white'
                ].join(' ')}
                onClick={() => onSelectConversation(conversation.id)}
                type="button"
              >
                <div
                  className={[
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold shadow-sm',
                    active ? 'bg-white/20 text-white' : 'bg-[#eef2f7] text-[#1d9bf0]'
                  ].join(' ')}
                >
                  {conversation.name.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[16px] font-semibold">{conversation.name}</p>
                    <span
                      className={[
                        'shrink-0 text-xs',
                        active ? 'text-white/90' : 'text-slate-400'
                      ].join(' ')}
                    >
                      {conversation.time}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <p
                      className={[
                        'min-w-0 flex-1 truncate text-sm',
                        active ? 'text-white/90' : 'text-slate-500'
                      ].join(' ')}
                    >
                      {conversation.preview}
                    </p>
                    {conversation.muted ? (
                      <VolumeX
                        className={active ? 'h-4 w-4 text-white/85' : 'h-4 w-4 text-slate-300'}
                      />
                    ) : null}
                    {conversation.unreadCount > 0 ? (
                      <span
                        className={[
                          'min-w-[20px] rounded-full px-1.5 text-center text-[11px] font-semibold leading-5',
                          active ? 'bg-white/20 text-white' : 'bg-[#f0f1f5] text-slate-500'
                        ].join(' ')}
                      >
                        {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
