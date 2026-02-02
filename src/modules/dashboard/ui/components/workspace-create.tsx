'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { isDefinedError } from '@orpc/client';
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { orpc } from '@/lib/orpc';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreateWorkspaceForm, CreateWorkspaceFormType } from '@/modules/dashboard/schema';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export const WorkspaceCreate = () => {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient()

	const form = useForm<CreateWorkspaceFormType>({
		resolver: zodResolver(CreateWorkspaceForm),
		defaultValues: {
			name: ""
		}
	});

	const createWorkspaceMutation = useMutation(
		orpc.workspace.create.mutationOptions({
			onSuccess: (newWorkspace) => {
				toast.success(`Workspace ${newWorkspace.workspaceName} created`)

				queryClient.invalidateQueries({
					queryKey: orpc.workspace.list.queryKey()
				})

				form.reset()

				onOpenChange(false)
			},
			onError: (error) => {
				if (isDefinedError(error)) {
					if (error.code === 'RATE_LIMITED') {
						toast.error(error.message);
						return;
					}
					toast.error(error.message)
				}
				toast.error("Failed to create new workspace")
				return;
			}
		})
	)

	const onSubmit = (values: CreateWorkspaceFormType) => {
		createWorkspaceMutation.mutate(values)
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<Tooltip>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="size-12 rounded-xl border-2 border-dashed border-muted-foreground/15 text-muted-foreground hover:border-muted-foreground hover:text-foreground hover:rounded-lg transition-all duration-200"
						>
							<PlusIcon className="size-5" />
						</Button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent side="right">
					<p className="font-medium">Create Workspace</p>
				</TooltipContent>
			</Tooltip>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Workspace</DialogTitle>
					<DialogDescription>
						Create a new Workspace to get started
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="My Workspace" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={createWorkspaceMutation.isPending} type='submit'>
							{createWorkspaceMutation.isPending ? "Creating..." : "Create workspace"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
