import z from "zod";

import prisma from "@/lib/prisma";
import { base } from "@/app/middlewares/base";
import { getAvatar } from "@/lib/get-avatar";
import { Message } from "@/generated/prisma/client";
import { CreateMessageForm } from "@/modules/dashboard/schema";
import { requiredAuthMiddleware } from "@/app/middlewares/auth";
import { writeSecurityMiddleware } from "@/app/middlewares/arcjet/write";
import { requiredWorkspaceMiddleware } from "@/app/middlewares/workspace";
import { standardSecurityMiddleware } from "@/app/middlewares/arcjet/standard";
import { readSecurityMiddleware } from "@/app/middlewares/arcjet/read";

export const createMessage = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .use(standardSecurityMiddleware)
  .use(writeSecurityMiddleware)
  .route({
    method: "POST",
    path: "/messages",
    summary: "Create a message",
    tags: ["Messages"]
  })
  .input(CreateMessageForm)
  .output(z.custom<Message>())
  .handler(async ({ input, context, errors }) => {
    const channel = await prisma.channel.findFirst({
      where: {
        id: input.channelId,
        workspaceId: context.workspace.orgCode
      },
    });

    if (!channel) {
      throw errors.FORBIDDEN();
    }

    const createMessage = await prisma.message.create({
      data: {
        content: input.content,
        imageUrl: input.imageUrl,
        channelId: input.channelId,
        authorId: context.user.id,
        authorEmail: context.user.email!,
        authorName: context.user.given_name ?? "John Doe",
        authorAvatar: getAvatar(context.user.picture, context.user.email!),
      }
    })

    return {
      ...createMessage
    }
  }
);

export const listMessages = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .use(standardSecurityMiddleware)
  .use(readSecurityMiddleware)
  .route({
    method: "GET",
    path: "/messages",
    summary: "List of Messages",
    tags: ["Messages"]
  })
  .input(z.object({ 
    channelId: z.string()
  }))
  .output(z.array(z.custom<Message>()))
  .handler(async ({ input, context, errors }) => {
    const channel = await prisma.channel.findFirst({
      where: {
        id: input.channelId,
        workspaceId: context.workspace.orgCode
      }
    });

    if (!channel) {
      throw errors.FORBIDDEN()
    }
    
    const data = await prisma.message.findMany({
      where: {
        channelId: input.channelId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data
  }
);