'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import {zodResolver} from '@hookform/resolvers/zod'

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
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { CreateWorkspaceForm, CreateWorkspaceFormType } from '@/modules/dashboard/schema';

export const WorkspaceCreate = () => {
	const [open, onOpenChange] = useState(false);

  const form = useForm<CreateWorkspaceFormType>({
    resolver: zodResolver(CreateWorkspaceForm),
    defaultValues: { 
      name: ""
    }
	});

	const onSubmit = (values: CreateWorkspaceFormType) => {
		console.log(values);
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
            
            <Button type='submit'>
              Create Workspace
            </Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
