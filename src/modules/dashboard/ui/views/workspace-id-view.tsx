import { CloudIcon } from 'lucide-react';

import { CreateNewChannel } from '@/modules/dashboard/ui/components/create-new-channel';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';

export const WorkspaceIdView = () => {
  return (
    <div className='p-20 flex flex-1'>
      <Empty className="border border-dashed from-muted/50 to-background h-full bg-gradient-to-b from-30%">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CloudIcon />
          </EmptyMedia>
          <EmptyTitle>No Channels yet!</EmptyTitle>
          <EmptyDescription>
            Create your first channel to get started!
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className='max-w-xs mx-auto'>
          <CreateNewChannel />
        </EmptyContent>
      </Empty>
    </div>
	);
};
