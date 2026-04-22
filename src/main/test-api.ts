import OpenAI from 'openai'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// 加载环境变量
dotenv.config({ path: resolve(__dirname, '../../.env') })

async function test() {
  const apiKey = process.env.DASHSCOPE_API_KEY
  const baseUrl = process.env.DASHSCOPE_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  const model = process.env.QCLAW_MODEL || 'qwen-plus'

  console.log('--- API Test Configuration ---')
  console.log('API Key:', apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}` : 'MISSING')
  console.log('Base URL:', baseUrl)
  console.log('Model:', model)
  console.log('------------------------------')

  if (!apiKey) {
    console.error('Error: DASHSCOPE_API_KEY is not defined in .env')
    return
  }

  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: baseUrl
  })

  try {
    console.log('Sending request to DashScope...')
    const completion = await client.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: '你是谁？' }
      ]
    })

    console.log('--- API Response ---')
    console.log('Status: Success')
    console.log('Content:', completion.choices[0]?.message?.content)
    console.log('Full Message Object:', JSON.stringify(completion.choices[0]?.message, null, 2))
    console.log('--------------------')
  } catch (error) {
    console.error('--- API Error ---')
    if (error instanceof Error) {
      console.error('Message:', error.message)
      // @ts-ignore
      if (error.status) console.error('Status:', error.status)
      // @ts-ignore
      if (error.data) console.error('Data:', JSON.stringify(error.data, null, 2))
    } else {
      console.error('Unknown Error:', error)
    }
    console.log('-----------------')
  }
}

test()
