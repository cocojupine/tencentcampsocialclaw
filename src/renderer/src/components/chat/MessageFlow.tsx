import { MoreHorizontal } from 'lucide-react'
import type { Message } from '../../types/chat'

type MessageFlowProps = {
  messages: Message[]
}

export function MessageFlow({ messages }: React.PropsWithChildren<MessageFlowProps>): React.JSX.Element {
  return (
    <section className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <div className="text-center text-xs font-medium tracking-[0.24em] text-slate-300">21:45</div>

        {messages.map((message) => (
          <article
            key={message.id}
            className={['group flex items-start gap-3', message.isSelf ? 'justify-end' : 'justify-start'].join(
              ' '
            )}
          >
            {!message.isSelf ? (
              <img alt={message.sender} className="h-10 w-10 rounded-full object-cover shadow-sm" src={message.avatar} />
            ) : null}

            <div className={['relative max-w-[70%]', message.isSelf ? 'order-first' : 'order-last'].join(' ')}>
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
              <img alt={message.sender} className="h-10 w-10 rounded-full object-cover shadow-sm" src={message.avatar} />
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
