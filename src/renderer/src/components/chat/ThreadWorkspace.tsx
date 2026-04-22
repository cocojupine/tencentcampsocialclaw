import {
  AtSign,
  Image,
  MessageSquareText,
  Paperclip,
  SendHorizonal,
  Smile,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import { AgentPostCard } from './AgentPostCard'
import type { AgentCard, AgentCardAction, Scenario, ThreadComment } from '../../types/chat'

type ThreadWorkspaceProps = {
  visible: boolean
  scenario: Scenario
  card: AgentCard
  comments: ThreadComment[]
  onCardAction: (actionId: AgentCardAction) => void
  onRunQClawPrompt: (promptId: string) => void
  onSendThreadMessage: (message: string) => void
}

export function ThreadWorkspace({
  visible,
  scenario,
  card,
  comments,
  onCardAction,
  onRunQClawPrompt,
  onSendThreadMessage
}: ThreadWorkspaceProps): React.JSX.Element | null {
  const [draft, setDraft] = useState('')

  if (!visible) return null

  const handleSubmit = (): void => {
    if (!draft.trim()) return
    onSendThreadMessage(draft.trim())
    setDraft('')
  }

  return (
    <section className="shrink-0 border-b border-[#e7ebf3] bg-[#f6f8fc] px-8 py-3">
      <div className="mx-auto grid max-w-5xl gap-4 xl:grid-cols-[minmax(0,1fr)_312px]">
        <div className="overflow-hidden rounded-[22px] border border-[#e5ebf3] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between border-b border-[#edf1f6] px-5 py-3">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-semibold text-[#1d9bf0]">
                <MessageSquareText className="h-4 w-4" />
                贴内讨论区
              </div>
              <div className="mt-2 flex items-center gap-2">
                <h3 className="truncate text-[18px] font-semibold text-slate-900">
                  {scenario.thread.title}
                </h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500">
                  {scenario.thread.statusPill}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-slate-400">{scenario.thread.subtitle}</p>
            </div>
            <div className="text-xs text-slate-300">入口已悬挂到顶栏</div>
          </div>

          <div className="max-h-[270px] overflow-y-auto bg-[#f7f9fc] px-5 py-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <div
                    className={[
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                      comment.role === 'qclaw'
                        ? 'bg-[#eaf5ff] text-[#1d9bf0]'
                        : 'bg-slate-200 text-slate-600'
                    ].join(' ')}
                  >
                    {comment.role === 'qclaw' ? 'Q' : comment.author.slice(0, 1)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-slate-600">{comment.author}</span>
                      <span>{comment.time}</span>
                      {comment.role === 'qclaw' ? (
                        <span className="rounded-full bg-[#eef5ff] px-2 py-0.5 text-[10px] font-semibold text-[#1d9bf0]">
                          QClaw
                        </span>
                      ) : null}
                    </div>

                    <div
                      className={[
                        'max-w-[88%] rounded-[18px] px-4 py-3 text-sm leading-6 shadow-sm',
                        comment.role === 'qclaw'
                          ? 'border border-[#d7ebff] bg-[#f4f9ff] text-slate-600'
                          : 'bg-white text-slate-600'
                      ].join(' ')}
                    >
                      {comment.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#edf1f6] bg-white px-5 py-3">
            <div className="flex items-center gap-2 text-slate-400">
              {[Smile, Image, Paperclip].map((Icon, index) => (
                <button
                  key={`thread-tool-${index}`}
                  className="flex h-8 w-8 items-center justify-center rounded-xl transition hover:bg-[#f1f5fb] hover:text-slate-600"
                  type="button"
                >
                  <Icon className="h-4.5 w-4.5" />
                </button>
              ))}
              <div className="ml-2 text-xs text-slate-300">在贴内继续讨论，或直接 @QClaw</div>
            </div>

            <div className="mt-3 rounded-[18px] border border-[#e6ebf3] bg-[#f9fbfd] p-3">
              <textarea
                className="h-16 w-full resize-none border-none bg-transparent text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400"
                onChange={(event) => setDraft(event.target.value)}
                placeholder="输入贴内回复，或直接输入 @QClaw 询问进度、提醒时机和整理建议。"
                value={draft}
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {scenario.thread.qclawPrompts.map((prompt) => (
                    <button
                      key={prompt.id}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-700"
                      onClick={() => onRunQClawPrompt(prompt.id)}
                      type="button"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
                <button
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1d9bf0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#148be0]"
                  onClick={handleSubmit}
                  type="button"
                >
                  <SendHorizonal className="h-4 w-4" />
                  发到贴内
                </button>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400">
                <AtSign className="h-3.5 w-3.5" />
                输入 @QClaw 可触发静态演示回复
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <AgentPostCard card={card} onAction={onCardAction} compact />
          <div className="rounded-[22px] border border-[#e6eef9] bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-semibold text-[#1d9bf0]">
              <Sparkles className="h-4 w-4" />
              QClaw 提示
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              龙虾在贴内只做协助，不代替任何人发言。它更像一个可被点名的贴内助理，负责追踪、整理和提醒。
            </p>
            <div className="mt-3 rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm text-slate-400">
              当前阶段不接真实大模型，这里通过预设问法和 @QClaw 输入演示完整链路。
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
