import { ChannelIdHeader } from '@/modules/dashboard/ui/components/channel-id-header';
import { ChannelMessageList } from '@/modules/dashboard/ui/components/channel-message-list';

export const ChannelIdView = () => {
	return (
		<div className="flex h-screen w-full">
			{/* Main Channel Area */}
			<div className="flex flex-col flex-1 min-w-0">
				{/* Channel Header */}
				<ChannelIdHeader />
			  {/* Scrollable Message Area */}
        <div className="flex-1 overflow-hidden mb-4">
          <ChannelMessageList />
        </div>
			</div>
		</div>
	);
};
