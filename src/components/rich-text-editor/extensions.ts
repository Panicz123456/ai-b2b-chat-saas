import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from 'lowlight'
import TextAlign from '@tiptap/extension-text-align'
import {Placeholder} from '@tiptap/extensions/placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'


const lowlight = createLowlight(all)

export const baseExtension = [ 
  StarterKit.configure({ 
    codeBlock: false
  }),
  TextAlign.configure({ 
    types: ['heading', "paragraph"]
  }),
  CodeBlockLowlight.configure({ 
    lowlight,
  })
]

export const editorExtensions = [ 
  ...baseExtension,
  Placeholder.configure({ 
    placeholder: 'Type your message...'
  })
]