"use client";

import Image from 'next/image';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { CreditCardIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { PortalLink } from '@kinde-oss/kinde-auth-nextjs/components';

import { orpc } from '@/lib/orpc';
import { getAvatar } from '@/lib/get-avatar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


export const UserNavbar = () => {
	const {data: {user} } = useSuspenseQuery(orpc.workspace.list.queryOptions())

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="size-12 rounded-xl hover:rounded-lg transition-all duration-200 bg-background/50 border-border/50 hover:bg-accent hover:text-accent-foreground"
				>
					<Avatar>
						<AvatarImage
							src={getAvatar(user.picture, user.email!)}
							alt="User Image"
							className="object-cover"
						/>
						<AvatarFallback>
							{user.given_name?.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				side="right"
				sideOffset={8}
				className="w-[200px]"
			>
				<DropdownMenuLabel className="font-normal flex items-center gap-2 px-1 py-1.5 text-left">
					<Avatar className="relative size-8 rounded-lg">
						<Image
							src={getAvatar(user.picture, user.email!)}
							alt="User Image"
							className="object-cover"
						/>
						<AvatarFallback>
							{user.given_name?.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col flex-1 text-left text-sm leading-tight">
						<p className="truncate">{user.given_name}</p>
						<p className="text-muted-foreground truncate text-xs">
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<PortalLink>
							<UserIcon />
							Account
						</PortalLink>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<PortalLink>
							<CreditCardIcon />
							Billing
						</PortalLink>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<LogoutLink>
						<LogOutIcon />
						Logout
					</LogoutLink>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
