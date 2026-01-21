import { z } from 'zod'

export const CreateWorkspaceForm = z.object({ 
  name: z.string().min(2).max(15)
})

export type CreateWorkspaceFormType = z.infer<typeof CreateWorkspaceForm>