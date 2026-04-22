import { ChatHeader } from './ChatHeader'
import { MessageFlow } from './MessageFlow'
import { MessageInputArea } from './MessageInputArea'
import { PinnedEntryBar } from './PinnedEntryBar'
import { ThreadWorkspace } from './ThreadWorkspace'
import type {
  AgentCard,
  AgentCardAction,
  Conversation,
  Scenario,
  ScenarioId,
  ThreadComment
} from '../../types/chat'

type ChatAreaProps = {
  conversation: Conversation
  activeScenario: Scenario
  activeCard: AgentCard
  privateSuggestionVisible: boolean
  entryVisible: boolean
  threadOpen: boolean
  threadComments: ThreadComment[]
  scenarioTabs: Array<{ id: ScenarioId; name: string }>
  onConfirmSuggestion: () => void
  onDismissSuggestion: () => void
  onCardAction: (actionId: AgentCardAction) => void
  onOpenPinnedEntry: () => void
  onRunQClawPrompt: (promptId: string) => void
  onSendThreadMessage: (message: string) => void
  onSelectScenario: (scenarioId: ScenarioId) => void
  onResetScenario: () => void
}

export function ChatArea({
  conversation,
  activeScenario,
  activeCard,
  privateSuggestionVisible,
  entryVisible,
  threadOpen,
  threadComments,
  scenarioTabs,
  onConfirmSuggestion,
  onDismissSuggestion,
  onCardAction,
  onOpenPinnedEntry,
  onRunQClawPrompt,
  onSendThreadMessage,
  onSelectScenario,
  onResetScenario
}: ChatAreaProps): React.JSX.Element {
  return (
    <main className="flex min-w-0 flex-1 flex-col bg-[#f5f7fb]">
      <ChatHeader
        conversation={conversation}
        scenario={activeScenario}
        showBackButton={threadOpen}
        onBack={onResetScenario}
      />
      <PinnedEntryBar
        visible={entryVisible}
        scenario={activeScenario}
        card={activeCard}
        threadOpen={threadOpen}
        onOpen={onOpenPinnedEntry}
      />
      <ThreadWorkspace
        visible={threadOpen}
        scenario={activeScenario}
        card={activeCard}
        comments={threadComments}
        onCardAction={onCardAction}
        onRunQClawPrompt={onRunQClawPrompt}
        onSendThreadMessage={onSendThreadMessage}
      />
      <MessageFlow
        messages={activeScenario.messages}
        suggestion={activeScenario.suggestion}
        privateSuggestionVisible={privateSuggestionVisible}
        onConfirmSuggestion={onConfirmSuggestion}
        onDismissSuggestion={onDismissSuggestion}
      />
      <MessageInputArea
        activeScenarioId={activeScenario.id}
        scenarios={scenarioTabs}
        onSelectScenario={onSelectScenario}
        onResetScenario={onResetScenario}
      />
    </main>
  )
}
