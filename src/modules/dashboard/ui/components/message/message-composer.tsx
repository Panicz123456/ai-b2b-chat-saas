import { RichTextEditor } from "@/components/rich-text-editor/Editor"
import { Button } from "@/components/ui/button"
import { ImageIcon, SendIcon } from "lucide-react"

interface MessageComposerProps {
  value: string
  onChange: (next: string) => void
}

export const MessageComposer = ({
  onChange, value
}: MessageComposerProps) => {
  return (
    <>
      <RichTextEditor
        field={{ value, onChange }}
        sendButton={<Button type="button" size="sm">
          <SendIcon className="size-4 mr-1" />
          Send
        </Button>
        }
        footerLeft={ 
          <Button type="button" size="sm" variant="outline">
            <ImageIcon className="size-4 mr-1" />
            Attache
          </Button>
        }
      />
    </>
  )
}