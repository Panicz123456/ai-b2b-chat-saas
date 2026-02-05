import { heavyWriteSecurityMiddleware } from '@/app/middlewares/arcjet/heavy-write';
import { standardSecurityMiddleware } from '@/app/middlewares/arcjet/standard';
import { requiredAuthMiddleware } from '@/app/middlewares/auth';
import { base } from '@/app/middlewares/base';
import { requiredWorkspaceMiddleware } from '@/app/middlewares/workspace';
import { Channel } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';
import { CreateChannelForm } from '@/modules/dashboard/schema';
import { KindeOrganization } from '@kinde-oss/kinde-auth-nextjs';
import { init, organization_user, Organizations } from '@kinde/management-api-js';
import z from 'zod';

export const createChannel = base
	.use(requiredAuthMiddleware)
	.use(requiredWorkspaceMiddleware)
	.use(standardSecurityMiddleware)
	.use(heavyWriteSecurityMiddleware)
	.route({
		method: 'POST',
		path: '/channels',
		summary: 'Create a new Channel',
		tags: ['channels'],
	})
	.input(CreateChannelForm)
	.output(z.custom<Channel>())
	.handler(async ({ input, context }) => {
		const channel = await prisma.channel.create({
			data: {
				name: input.name,
				workspaceId: context.workspace.orgCode,
				createdById: context.user.id,
			},
		});

		return channel;
	});

export const listChannels = base
	.use(requiredAuthMiddleware)
	.use(requiredWorkspaceMiddleware)
	.route({
		method: 'GET',
		path: '/channels',
		summary: 'List of Channels',
		tags: ['channels'],
	})
	.input(z.void())
  .output(z.object({
    channels: z.array(z.custom<Channel>()),
    currentWorkspace: z.custom<KindeOrganization<unknown>>(),
    members: z.array(z.custom<organization_user>())
  }))
	.handler(async ({ context }) => {
		const [channels, members] = await Promise.all([
			prisma.channel.findMany({
				where: {
					workspaceId: context.workspace.orgCode,
				},
				orderBy: {
					createdAt: 'desc',
				},
			}),

			(async () => {
				try {
					init();
					const usersInOrg = await Organizations.getOrganizationUsers({
						orgCode: context.workspace.orgCode,
						sort: 'name_asc',
					});
					return usersInOrg.organization_users ?? [];
				} catch (err) {
					// Kinde API 403: check KINDE_MANAGEMENT_* env and org API permissions
					return [];
				}
			})(),
    ]);
    
    return { 
      channels,
      members,
      currentWorkspace: context.workspace
    }
  }
);
