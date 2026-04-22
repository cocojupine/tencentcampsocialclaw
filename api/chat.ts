import { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from 'openai'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { scenarioId, message, history, trackedCards } = req.body
  const apiKey = process.env.DASHSCOPE_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'DASHSCOPE_API_KEY not configured on Vercel' })
  }

  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: process.env.DASHSCOPE_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })

  try {
    const messages = [
      {
        role: 'system' as const,
        content: `你是QQ群助手QClaw。口吻自然、极其简短。只答贴内内容。${
          scenarioId === 'qclaw-tracker'
            ? `当前在追踪中心。用户订阅了卡片：${JSON.stringify(trackedCards)}`
            : ''
        }`
      },
      ...history.slice(-3).map((item: any) => ({
        role: item.role === 'qclaw' ? 'assistant' : 'user',
        content: `${item.author}: ${item.content}`
      })),
      { role: 'user', content: message }
    ]

    const completion = await client.chat.completions.create({
      model: process.env.QCLAW_MODEL || 'qwen3.5-flash',
      messages,
      temperature: 0.7,
      max_tokens: 300,
      extra_body: { enable_thinking: true }
    } as any)

    const content = completion.choices[0]?.message?.content || ''
    return res.status(200).json({ success: true, response: content.trim() })
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
