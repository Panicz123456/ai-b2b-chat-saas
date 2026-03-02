import { ImageIcon, SendIcon } from 'lucide-react';

import { RichTextEditor } from '@/components/rich-text-editor/Editor';
import { Button } from '@/components/ui/button';

interface MessageComposerProps {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void
  isSubmitting?: boolean; 
}

export const MessageComposer = ({
  onChange,
  value,
  isSubmitting,
  onSubmit
}: MessageComposerProps) => {
  return (
    <>
      <RichTextEditor
        field={{ value, onChange }}
        sendButton={
          <Button
            type="submit"
            size="sm"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            <SendIcon className="size-4 mr-1" />
            {isSubmitting ? 'Sending...' : 'Send'}
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
  );
};
