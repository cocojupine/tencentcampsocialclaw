import { Bell, Lock, Sparkles, Swords, Tags } from 'lucide-react'
import type { AgentCard } from '../../types/chat'

type AgentPostCardProps = {
  card: AgentCard
  onAction: (actionId: AgentCard['actions'][number]['id']) => void
  compact?: boolean
}

const iconMap = {
  'team-up-post': Swords,
  'spoiler-thread-post': Lock,
  'standee-group-buy-post': Tags
} as const

const progressWidthClass = (current: number, total: number): string => {
  const ratio = current / total

  if (ratio >= 1) return 'w-full'
  if (ratio >= 0.8) return 'w-4/5'
  if (ratio >= 0.66) return 'w-2/3'
  if (ratio >= 0.5) return 'w-1/2'
  if (ratio >= 0.33) return 'w-1/3'
  if (ratio >= 0.2) return 'w-1/4'
  return 'w-[12%]'
}

export function AgentPostCard({
  card,
  onAction,
  compact = false
}: AgentPostCardProps): React.JSX.Element {
  const Icon = iconMap[card.templateId]

  return (
    <div
      className={[
        'overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.08)]',
        compact ? 'max-w-none' : 'max-w-[620px]'
      ].join(' ')}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${card.accent}`} />
      <div className={compact ? 'p-4' : 'p-5'}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                  {card.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI 助理协助
                </span>
              </div>
              <h3 className="mt-2 text-[17px] font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{card.metaLabel}</p>
            </div>
          </div>
          <div className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            {card.statusText}
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{card.description}</p>

        {card.progress ? (
          <div className="mt-4 rounded-2xl bg-[#f7f9fc] p-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>当前进度</span>
              <span className="font-semibold text-slate-700">
                {card.progress.current}/{card.progress.total}
                {card.progress.unit}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${card.accent} ${progressWidthClass(
                  card.progress.current,
                  card.progress.total
                )}`}
              />
            </div>
          </div>
        ) : null}

        {card.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {card.actions.map((action) => (
            <button
              key={action.id}
              className={[
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                action.style === 'primary'
                  ? 'bg-[#1d9bf0] text-white hover:bg-[#148be0]'
                  : action.style === 'secondary'
                    ? 'bg-[#eef5ff] text-[#1d9bf0] hover:bg-[#deedff]'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              ].join(' ')}
              onClick={() => onAction(action.id)}
              type="button"
            >
              {action.style === 'secondary' && action.id.includes('remind') ? (
                <Bell className="mr-1 inline h-4 w-4" />
              ) : null}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
