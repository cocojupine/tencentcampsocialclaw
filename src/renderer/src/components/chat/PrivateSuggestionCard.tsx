import { Sparkles, X } from 'lucide-react'
import type { PrivateSuggestion } from '../../types/chat'

type PrivateSuggestionCardProps = {
  suggestion: PrivateSuggestion
  onConfirm: () => void
  onDismiss: () => void
}

export function PrivateSuggestionCard({
  suggestion,
  onConfirm,
  onDismiss
}: PrivateSuggestionCardProps): React.JSX.Element {
  return (
    <div className="relative max-w-[520px] rounded-[22px] border border-[#dbeafe] bg-[#f3f9ff] p-4 shadow-[0_10px_24px_rgba(59,130,246,0.12)]">
      <button
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-white hover:text-slate-600"
        onClick={onDismiss}
        type="button"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1d9bf0]">
        <Sparkles className="h-4 w-4" />
        {suggestion.title}
      </div>

      <p className="mt-2 pr-8 text-sm leading-6 text-slate-600">{suggestion.body}</p>

      <div className="mt-4 flex items-center gap-2">
        <button
          className="rounded-full bg-[#1d9bf0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#148be0]"
          onClick={onConfirm}
          type="button"
        >
          {suggestion.confirmLabel}
        </button>
        <button
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
          onClick={onDismiss}
          type="button"
        >
          {suggestion.dismissLabel}
        </button>
      </div>
    </div>
  )
}
