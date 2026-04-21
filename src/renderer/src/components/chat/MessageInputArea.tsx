import {
  FolderClosed,
  Image,
  Laugh,
  Mic,
  ScissorsLineDashed,
  SendHorizonal,
  Sticker,
  Upload
} from 'lucide-react'

const toolbarIcons = [Laugh, ScissorsLineDashed, FolderClosed, Image, Upload, Mic, Sticker]

export function MessageInputArea(): React.JSX.Element {
  return (
    <section className="h-[170px] shrink-0 border-t border-[#e7ebf3] bg-white px-8 py-4">
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <div className="flex items-center gap-2 text-slate-500">
          {toolbarIcons.map((Icon, index) => (
            <button
              key={`toolbar-${index}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-[#f3f6fa] hover:text-slate-800"
              type="button"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        <div className="mt-3 flex min-h-0 flex-1 gap-4">
          <textarea
            className="min-h-0 flex-1 resize-none rounded-2xl border border-transparent bg-[#f7f9fc] px-4 py-3 text-[15px] leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#bfdbfe] focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
            placeholder="输入消息，和群友讨论周边、演出和周末计划..."
          />

          <div className="flex w-[128px] shrink-0 items-end justify-end">
            <button
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-[#1d9bf0] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(29,155,240,0.24)] transition hover:bg-[#148be0]"
              type="button"
            >
              <SendHorizonal className="h-4 w-4" />
              发送
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
