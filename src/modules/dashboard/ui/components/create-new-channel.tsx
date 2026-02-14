'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { isDefinedError } from '@orpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { orpc } from '@/lib/orpc';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	CreateChannelForm,
	CreateChannelFormType,
	transformChannelName,
} from '@/modules/dashboard/schema';

export const CreateNewChannel = () => {
	const router = useRouter()
	const {workspaceId} = useParams<{workspaceId: string}>()
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient()

	const form = useForm<CreateChannelFormType>({
		resolver: zodResolver(CreateChannelForm),
		defaultValues: {
			name: '',
		},
	});

	const createChannel = useMutation(
		orpc.channel.create.mutationOptions({
			onSuccess: (newChannel) => {
        toast.success(`Channel: ${newChannel.name} Created`);

        queryClient.invalidateQueries({
          queryKey: orpc.channel.list.queryKey()
        })

				form.reset();
				onOpenChange(false);

				router.push(`/workspace/${workspaceId}/channel/${newChannel.id}`)
			},
			onError: (error) => {
				if (isDefinedError(error)) {
					toast.error(error.message);
					return;
				}

				toast.error('Failed to create channel');
			},
		})
	);

	const onSubmit = (values: CreateChannelFormType) => {
		createChannel.mutate(values);
	};

	const watchedName = form.watch('name');
	const transformedName = watchedName ? transformChannelName(watchedName) : '';

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full">
					<PlusIcon className="size-4" />
					Add channel
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new channel</DialogTitle>
					<DialogDescription>
						Create a new channel to get started
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="My Channel" {...field} />
									</FormControl>
									{transformedName && transformedName !== watchedName && (
										<p className="text-sm text-muted-foreground">
											Will be created as:{' '}
											<code className="bg-muted px-1 py-0.5 rounded text-sm">
												{transformedName}
											</code>
										</p>
									)}
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" disabled={createChannel.isPending}>
							{createChannel.isPending ? 'Creating...' : 'Create new Channel'}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
