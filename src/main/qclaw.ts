import OpenAI from 'openai'

type QClawScenarioId = 'team-up' | 'spoiler-thread' | 'standee-group-buy'

export type QClawHistoryItem = {
  author: string
  role: 'user' | 'qclaw' | 'system'
  content: string
}

export type QClawChatPayload = {
  scenarioId: QClawScenarioId
  message: string
  history: QClawHistoryItem[]
  trackedCards?: any[]
}

type QClawRuntimeConfig = {
  enabled: boolean
  hasApiKey: boolean
  model: string
  enableThinking: boolean
  temperature: number
  topP: number
  maxTokens: number
}

function toBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

function toNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function buildScenarioInstruction(scenarioId: QClawScenarioId): string {
  switch (scenarioId) {
    case 'team-up':
      return '场景：王者组队。职责：判断是否补位、建议提醒。'
    case 'spoiler-thread':
      return '场景：防剧透贴。职责：整理时间线、写安全提示。'
    case 'standee-group-buy':
      return '场景：立牌拼团。职责：追踪意向、整理人数。'
  }
}

export function getQClawConfig(): QClawRuntimeConfig {
  const apiKey = process.env.DASHSCOPE_API_KEY
  const hasApiKey = Boolean(apiKey)

  return {
    enabled: hasApiKey,
    hasApiKey,
    model: process.env.QCLAW_MODEL || 'qwen3.5-flash',
    enableThinking: toBoolean(process.env.QCLAW_ENABLE_THINKING, false),
    temperature: toNumber(process.env.QCLAW_TEMPERATURE, 0.7),
    topP: toNumber(process.env.QCLAW_TOP_P, 0.8),
    maxTokens: toNumber(process.env.QCLAW_MAX_TOKENS, 300)
  }
}

export async function runQClawChat(
  payload: QClawChatPayload,
  onToken?: (token: string) => void
): Promise<string> {
  const config = getQClawConfig()
  const apiKey = process.env.DASHSCOPE_API_KEY

  if (!apiKey) {
    throw new Error('DASHSCOPE_API_KEY is not configured in .env')
  }

  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: process.env.DASHSCOPE_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })

  try {
    const messages = [
      {
        role: 'system' as const,
        content: [
          '你是QQ群助手QClaw。',
          '口吻自然、极其简短。',
          '只答贴内内容，不编造。',
          payload.scenarioId === ('qclaw-tracker' as any)
            ? `当前在追踪中心。用户订阅了以下卡片：${JSON.stringify(
                payload.trackedCards?.map((tc) => ({
                  title: tc.card.title,
                  status: tc.card.statusText,
                  desc: tc.card.description
                }))
              )}。请基于这些卡片回答。`
            : buildScenarioInstruction(payload.scenarioId)
        ].join(' ')
      },
      ...payload.history.slice(-3).map((item) => ({
        role: item.role === 'qclaw' ? ('assistant' as const) : ('user' as const),
        content: `${item.author}: ${item.content}`
      })),
      {
        role: 'user' as const,
        content: payload.message
      }
    ]

    console.log(`[API Request] Sending to ${config.model} with ${messages.length} messages context...`)

    const startTime = Date.now()
    const isStreaming = typeof onToken === 'function'

    const requestOptions: any = {
      model: config.model,
      messages,
      temperature: config.temperature,
      top_p: config.topP,
      max_tokens: config.maxTokens,
      stream: isStreaming
    }

    if (config.enableThinking) {
      requestOptions.extra_body = { enable_thinking: true }
    }

    const response = await client.chat.completions.create(requestOptions)

    if (isStreaming) {
      let fullContent = ''
      for await (const chunk of response as any) {
        const token = chunk.choices[0]?.delta?.content || ''
        if (token) {
          fullContent += token
          onToken(token)
        }
      }
      const duration = ((Date.now() - startTime) / 1000).toFixed(1)
      console.log(`[API Response Stream] Completed in ${duration}s`)
      return fullContent.trim()
    } else {
      const completion = response as any
      const duration = ((Date.now() - startTime) / 1000).toFixed(1)
      console.log(`[API Response] Took ${duration}s`)

      const messageObj = completion.choices[0]?.message as any
      const content = messageObj?.content || ''

      return content.trim() || '我先记下来了。'
    }
  } catch (error) {
    console.error('[API Error] Details:', error)
    throw new Error(`API 调用失败: ${(error as any).message || '未知错误'}`)
  }
}