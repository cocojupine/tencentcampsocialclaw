import {
  Bell,
  BookMarked,
  FolderClosed,
  MessageCircleMore,
  Settings,
  Sparkles,
  Users,
  Video
} from 'lucide-react'

const navigationItems = [
  { id: 'messages', icon: MessageCircleMore, active: true, badge: 25 },
  { id: 'contacts', icon: Users },
  { id: 'channels', icon: Video },
  { id: 'moments', icon: Sparkles, dot: true },
  { id: 'files', icon: FolderClosed },
  { id: 'favorites', icon: BookMarked },
  { id: 'notices', icon: Bell }
]

export function Sidebar(): React.JSX.Element {
  return (
    <aside className="flex w-[68px] flex-col items-center justify-between bg-[#e5e7eb] px-3 py-5">
      <div className="flex w-full flex-col items-center gap-5">
        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#16c5d7] via-[#59d46b] to-[#f6d32d] shadow-[0_10px_24px_rgba(34,197,94,0.28)] transition hover:scale-[1.02]">
          <span className="text-lg font-semibold text-white">龙</span>
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#e5e7eb] bg-emerald-400" />
        </button>

        <nav className="flex w-full flex-col items-center gap-2">
          {navigationItems.map(({ id, icon: Icon, active, badge, dot }) => (
            <button
              key={id}
              className={[
                'relative flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-200',
                active
                  ? 'bg-white text-[#1d9bf0] shadow-[0_10px_20px_rgba(29,155,240,0.18)]'
                  : 'text-slate-700 hover:bg-white/80 hover:text-slate-900'
              ].join(' ')}
              type="button"
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
              {badge ? (
                <span className="absolute right-0 top-0 min-w-[18px] rounded-full bg-[#ff5a5f] px-1.5 text-[10px] font-semibold leading-[18px] text-white">
                  {badge}
                </span>
              ) : null}
              {dot ? (
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#ff5a5f]" />
              ) : null}
            </button>
          ))}
        </nav>
      </div>

      <button
        className="flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 transition hover:bg-white/80 hover:text-slate-900"
        type="button"
      >
        <Settings className="h-5 w-5" strokeWidth={2} />
      </button>
    </aside>
  )
}
