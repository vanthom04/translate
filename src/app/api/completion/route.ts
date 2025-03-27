import { NextResponse } from 'next/server'
import { createOpenAI } from '@ai-sdk/openai'
import { createDataStreamResponse, streamText } from 'ai'

import { buildTranslateNovelPrompt } from '@/lib/prompts'

const openai = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER_API_KEY,
})

export const POST = async (req: Request) => {
  try {
    const { prompt, context, toLanguage } = await req.json()
    const content = buildTranslateNovelPrompt(prompt, context, toLanguage)

    return createDataStreamResponse({
      async execute(dataStream) {
        const result = streamText({
          model: openai('google/gemini-2.5-pro-exp-03-25:free'),
          temperature: 0.2,
          prompt: content
        })

        result.mergeIntoDataStream(dataStream)
      },
      status: 200,
      statusText: 'OK'
    })
  } catch (error) {
    const message = (error as Error).message || 'Something went wrong'
    return new NextResponse(message, { status: 400 })
  }
}
