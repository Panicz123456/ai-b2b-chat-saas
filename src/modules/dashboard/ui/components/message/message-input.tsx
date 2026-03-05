'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { orpc } from '@/lib/orpc';
import {
  CreateMessageForm,
  CreateMessageFormType,
} from '@/modules/dashboard/schema';
import { MessageComposer } from '@/modules/dashboard/ui/components/message/message-composer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface MessageInputProps {
  channelId: string;
}

export const MessageInput = ({ channelId }: MessageInputProps) => {
  const queryClient = useQueryClient();
  const form = useForm<CreateMessageFormType>({
    resolver: zodResolver(CreateMessageForm),
    defaultValues: {
      channelId: channelId,
      content: '',
    },
  });

  const createMessageMutation = useMutation(
    orpc.message.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.message.list.key(),
        });

        form.reset()

        toast.success('Message created successfully');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    })
  );

  function onSubmit(values: CreateMessageFormType) {
    createMessageMutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MessageComposer
                  value={field.value}
                  onChange={field.onChange}
                  onSubmit={form.handleSubmit(onSubmit)}
                  isSubmitting={createMessageMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
