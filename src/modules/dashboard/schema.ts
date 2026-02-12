import { z } from 'zod'

export const CreateWorkspaceForm = z.object({ 
  name: z.string().min(2).max(15)
})

export type CreateWorkspaceFormType = z.infer<typeof CreateWorkspaceForm>

export function transformChannelName(name: string) { 
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export const CreateChannelForm = z.object({ 
  name: z
    .string()
    .min(2, "Channel name must be at least 2 characters")
    .max(15, "Channel name must be at most 50 characters")
    .transform((name, ctx) => { 
      const transformed = transformChannelName(name);

      if (transformed.length < 2) { 
        ctx.addIssue({
          code: "custom",
          message: "Channel name must contain at least 2 characters after transformation"
        });

        return z.NEVER
      }

      return transformed
    })
})

export type CreateChannelFormType = z.infer<typeof CreateChannelForm>

export const CreateMessageForm = z.object({ 
  channelId: z.string(),
  content: z.string(),
  imageUrl: z.url().optional(),
})

export type CreateMessageFormType = z.infer<typeof CreateMessageForm>