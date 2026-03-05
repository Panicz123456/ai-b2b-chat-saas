import { generateHTML, type JSONContent } from '@tiptap/react'

import { baseExtension } from '@/components/rich-text-editor/extensions'

export type JsonRichContent = JSONContent | string

export function jsonToHtml(jsonContent: JsonRichContent): string {
  try {
    if (typeof jsonContent === 'string') {
      try {
        const parsed = JSON.parse(jsonContent)
        return generateHTML(parsed, baseExtension)
      } catch {
        // If content is not valid JSON, render it as plain text
        const escaped = jsonContent
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br />')

        return escaped
      }
    }

    return generateHTML(jsonContent, baseExtension)
  } catch {
    // Silently fail and render nothing instead of spamming the console
    return ''
  }
}

