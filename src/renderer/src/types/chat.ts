export type Conversation = {
  id: string
  name: string
  preview: string
  time: string
  unreadCount: number
  avatar: string
  description?: string
  active?: boolean
  muted?: boolean
}

export type Message = {
  id: string
  senderId: string
  sender: string
  avatar: string
  content: string
  time: string
  isSelf: boolean
  card?: AgentCard // 新增：消息可以携带一个卡片
}

export type ScenarioId = 'team-up' | 'spoiler-thread' | 'standee-group-buy'

export type PrivateSuggestion = {
  id: string
  sourceMessageId: string
  title: string
  body: string
  confirmLabel: string
  dismissLabel: string
}

export type AgentCardTemplateId = 'team-up-post' | 'spoiler-thread-post' | 'standee-group-buy-post'

export type AgentCardAction =
  | 'join_team'
  | 'remind_team'
  | 'close_team'
  | 'open_thread'
  | 'mute_thread'
  | 'close_thread'
  | 'mark_interested'
  | 'remind_group_buy'
  | 'view_tracker'
  | 'subscribe'

export type AgentCard = {
  id: string
  templateId: AgentCardTemplateId
  sourceMessageId: string
  title: string
  description: string
  statusText: string
  status: string
  accent: string
  badge: string
  metaLabel: string
  progress?: {
    current: number
    total: number
    unit: string
  }
  tags?: string[]
  actions: Array<{
    id: AgentCardAction
    label: string
    style: 'primary' | 'secondary' | 'ghost'
  }>
  note?: string
  expanded?: boolean
  following?: boolean
}

export type PinnedEntry = {
  label: string
  summary: string
  pill: string
}

export type ThreadComment = {
  id: string
  author: string
  role: 'user' | 'qclaw' | 'system'
  content: string
  time: string
}

export type QClawPrompt = {
  id: string
  label: string
  ask: string
  response: string
}

export type QClawTrackedCard = {
  id: string
  conversationId: string
  scenarioId: ScenarioId
  card: AgentCard
  subscribedAt: string
}

export type ScenarioThread = {
  title: string
  subtitle: string
  statusPill: string
  entry: PinnedEntry
  comments: ThreadComment[]
  qclawPrompts: QClawPrompt[]
}

export type Scenario = {
  id: ScenarioId
  name: string
  triggerLine: string
  summary: string
  messages: Message[]
  suggestion: PrivateSuggestion
  card: AgentCard
  thread: ScenarioThread
}
