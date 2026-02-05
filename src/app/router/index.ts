import { createChannel, listChannels } from "@/app/router/channel";
import { createWorkspace, listWorkspaces } from "@/app/router/workspace";

export const router = { 
  workspace: { 
    list: listWorkspaces,
    create: createWorkspace,
  },

  channel: { 
    create: createChannel,
    list: listChannels
  }
}