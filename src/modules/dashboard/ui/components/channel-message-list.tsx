'use client';

import { useParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

import { orpc } from '@/lib/orpc';
import { MessageItem } from '@/modules/dashboard/ui/components/message/message-item';
import { Button } from '@/components/ui/button';

export const ChannelMessageList = () => {
	const { channelId } = useParams<{ channelId: string }>();
	const [hasInitialScroll, setHasInitialScroll] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [newMessages, setNewMessages] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const lastItemIdRef = useRef<string | undefined>(undefined)

	const infiniteOptions = orpc.message.list.infiniteOptions({
		input: (pageParam: string | undefined) => ({
			channelId: channelId,
			cursor: pageParam,
			limit: 30,
		}),
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		select: (data) => ({
			pages: [...data.pages].map((p) => ({ p, items: [...p.items].reverse() })),
			pageParams: [...data.pageParams].reverse(),
		}),
	});

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
	} = useInfiniteQuery({
		...infiniteOptions,
		staleTime: 30_000,
		refetchOnWindowFocus: false,
  });
  
  const isNearBottom = (el: HTMLDivElement) =>
    el.scrollHeight - el.scrollTop - el.clientHeight <= 80

	const handleScroll = () => {
		const el = scrollRef.current;

		if (!el) return;

		if (el.scrollTop <= 80 && hasNextPage && !isFetching) {
			const prevScrollHeight = el.scrollHeight;
			const prevScrollTop = el.scrollTop;
			fetchNextPage().then(() => {
				const newScrollHeight = el.scrollHeight;
				el.scrollTop = newScrollHeight - prevScrollHeight + prevScrollTop;
			});
    }
    
    setIsAtBottom(isNearBottom(el))
	};

	const items = useMemo(() => {
		return data?.pages.flatMap((p) => p.items) ?? [];
	}, [data]);

	useEffect(() => {
		if (!hasInitialScroll && data?.pages.length) {
			const el = scrollRef.current;

			if (el) {
				el.scrollTop = el.scrollHeight;
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setHasInitialScroll(true);
        setIsAtBottom(true)
			}
		}
  }, [data?.pages.length, hasInitialScroll]);

  useEffect(() => { 
    if (!items.length) return;

    const lastId = items[items.length - 1].id
    
    const prevLastId = lastItemIdRef.current

    const el = scrollRef.current

    if (prevLastId && lastId !== prevLastId) { 
      if (el && isNearBottom(el)) { 
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight
        });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNewMessages(false)
        setIsAtBottom(true)
      } else { 
        setNewMessages(true)
      }
    }

    lastItemIdRef.current = lastId
  }, [items.length, items])
  
  const scrollToButton = () => { 
    const el = scrollRef.current

    if (!el) return;

    el.scrollTop = el.scrollHeight;

    setNewMessages(false)
    setIsAtBottom(true)
  }

	return (
		<div className="relative h-full">
			<div
				className="h-full overflow-y-auto px-4"
				ref={scrollRef}
				onScroll={handleScroll}
			>
				{items?.map((message) => (
					<MessageItem key={message.id} message={message} />
        ))}
        <div ref={bottomRef}></div>
      </div>
      
      {newMessages && !isAtBottom ? ( 
        <Button
          type='button'
          className='absolute bottom-4 right-4 rounded-full'
          onClick={scrollToButton}
        >
          New Messages
        </Button>
      ): null}
		</div>
	);
};
