import { createChannel, listChannels } from "@/app/router/channel";
import { createMessage } from "@/app/router/message";
import { createWorkspace, listWorkspaces } from "@/app/router/workspace";

export const router = { 
  workspace: { 
    list: listWorkspaces,
    create: createWorkspace,
  },

  channel: { 
    create: createChannel,
    list: listChannels,
  },

  message: { 
    create: createMessage
  }
}