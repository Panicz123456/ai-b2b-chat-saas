import { generateHTML, type JSONContent } from '@tiptap/react';

import { baseExtension } from '@/components/rich-text-editor/extensions';

export function jsonToHtml(jsonContent: JSONContent): string {
	try {
		const content =
      typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
    
    return generateHTML(content, baseExtension)
  } catch {
    console.log("Error converting json to html")
    return '';
  }
}
