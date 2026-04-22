import { MoreHorizontal } from 'lucide-react'
import { PrivateSuggestionCard } from './PrivateSuggestionCard'
import type { Message, PrivateSuggestion } from '../../types/chat'

type MessageFlowProps = {
  messages: Message[]
  suggestion: PrivateSuggestion
  privateSuggestionVisible: boolean
  onConfirmSuggestion: () => void
  onDismissSuggestion: () => void
}

export function MessageFlow({
  messages,
  suggestion,
  privateSuggestionVisible,
  onConfirmSuggestion,
  onDismissSuggestion
}: MessageFlowProps): React.JSX.Element {
  return (
    <section className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <div className="text-center text-xs font-medium tracking-[0.24em] text-slate-300">
          NARRATIVE PROTOTYPE
        </div>

        {messages.map((message) => (
          <div key={message.id} className="flex flex-col gap-3">
            <article
              className={[
                'group flex items-start gap-3',
                message.isSelf ? 'justify-end' : 'justify-start'
              ].join(' ')}
            >
              {!message.isSelf ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[13px] font-bold text-slate-500 shadow-sm">
                  {message.sender.slice(0, 1)}
                </div>
              ) : null}

              <div
                className={[
                  'relative max-w-[70%]',
                  message.isSelf ? 'order-first' : 'order-last'
                ].join(' ')}
              >
                {/* AgentActionAnchor: reserved micro-slot for future per-message agent triggers and affordances. */}
                <button
                  aria-hidden="true"
                  className="absolute -right-6 top-3 flex h-5 w-5 items-center justify-center rounded-full text-transparent transition group-hover:text-slate-300"
                  tabIndex={-1}
                  type="button"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {!message.isSelf ? (
                  <div className="mb-1 flex items-center gap-2 px-1 text-sm text-slate-400">
                    <span className="font-medium text-slate-500">{message.sender}</span>
                    <span>{message.time}</span>
                  </div>
                ) : (
                  <div className="mb-1 px-1 text-right text-sm text-slate-400">{message.time}</div>
                )}

                <div
                  className={[
                    'rounded-[22px] px-4 py-3 text-[15px] leading-7 shadow-sm',
                    message.isSelf
                      ? 'rounded-tr-md bg-[#1d9bf0] text-white shadow-[0_10px_30px_rgba(29,155,240,0.22)]'
                      : 'rounded-tl-md border border-white/70 bg-white text-slate-700'
                  ].join(' ')}
                >
                  {message.content}
                </div>
              </div>

              {message.isSelf ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1d9bf0]/10 text-[13px] font-bold text-[#1d9bf0] shadow-sm">
                  {message.sender.slice(0, 1)}
                </div>
              ) : null}
            </article>

            {message.id === suggestion.sourceMessageId && privateSuggestionVisible ? (
              <div className="pl-[52px]">
                <PrivateSuggestionCard
                  suggestion={suggestion}
                  onConfirm={onConfirmSuggestion}
                  onDismiss={onDismissSuggestion}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
