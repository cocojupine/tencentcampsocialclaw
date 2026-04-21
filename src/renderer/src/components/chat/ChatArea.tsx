import { ChatHeader } from './ChatHeader'
import { MessageFlow } from './MessageFlow'
import { MessageInputArea } from './MessageInputArea'
import type { Conversation, Message } from '../../types/chat'

type ChatAreaProps = {
  conversation: Conversation
  messages: Message[]
}

export function ChatArea({ conversation, messages }: ChatAreaProps): React.JSX.Element {
  return (
    <main className="flex min-w-0 flex-1 flex-col bg-[#f5f7fb]">
      <ChatHeader conversation={conversation} />
      {/* AgentWidgetArea: reserved slot for future agent resonance widgets and inline orchestration surfaces. */}
      <div className="h-0 shrink-0 overflow-hidden" aria-hidden="true" />
      <MessageFlow messages={messages} />
      <MessageInputArea />
    </main>
  )
}
