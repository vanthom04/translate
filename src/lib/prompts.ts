export const buildTranslateNovelPrompt = (content: string, context: string, toLanguage: string) => `
Translate the following light novel text into ${toLanguage}, ensuring the translation is accurate, natural-sounding, and preserves the spirit of the original work. Adhere to these guidelines:

* **Tone and Style:** Maintain the author's writing style, including its tone (e.g., lighthearted, dramatic, formal) and narrative pacing.

* **Character Voices:** Preserve distinct voices for each character, reflecting their personalities, speech patterns, and any unique quirks or dialects.

* **Cultural Nuances:** For cultural references or idioms unfamiliar to ${toLanguage} readers, include concise explanations in footnotes or translator's notes, ensuring they don't disrupt the reading flow.

* **Terminology:** Ensure consistency in translating key terms (e.g., magic systems, titles, place names), researching common conventions in similar works or fan communities if applicable.

* **Accuracy:** Focus on conveying the original meaning and emotional impact rather than literal word-for-word translation.

* **Readability:** Adapt sentence structures and paragraph breaks to ensure the text flows naturally and is engaging for ${toLanguage} readers.

* **Context:** Consider the broader story context—such as character development, plot points, or foreshadowing—to inform translation decisions.

* **Target Audience:** Tailor the language to suit a younger audience familiar with light novel tropes and genres.

**The context of the light novel, before the excerpt, is as follows:**
${context || 'No context was provided.'}

Please follow the context of the light novel when translating.

**Text to Translate:** ${content}

**Output Content:** DO NOT change any line breaks or paragraph breaks. If the paragraph seems too short and you want to join it with the next paragraph, DO NOT do that. Two paragraphs in the unknown language MUST be translated to two separate paragraphs in ${toLanguage}. Provide the complete translation, including any necessary footnotes or translator's notes, without additional commentary. In your reply message, do not add anything other than the translation. Do not add any extra words or sentences.
`
