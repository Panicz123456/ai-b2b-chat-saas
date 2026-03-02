import DOMPurify from 'dompurify'
import parser from 'html-react-parser'

import { jsonToHtml, type JsonRichContent } from '../../lib/json-to-html'

interface SafeContentProps {
  content: JsonRichContent
  className?: string
}

export const SafeContent = ({
  content,
  className,
}: SafeContentProps) => {
  const html = jsonToHtml(content)

  const clean = DOMPurify.sanitize(html)

  return (
    <div className={className}>
      {parser(clean)}
    </div>
  )
}
