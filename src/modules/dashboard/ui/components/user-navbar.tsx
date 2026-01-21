import { CreditCardIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

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

const user = {
	picture: 'https://avatars.githubusercontent.com/u/124599?v=4',
	name: 'Panicz',
};

export const UserNavbar = () => {
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
							src={user.picture}
							alt="User Image"
							className="object-cover"
						/>
						<AvatarFallback>
							{user.name.slice(0, 2).toUpperCase()}
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
						<AvatarImage
							src={user.picture}
							alt="User Image"
							className="object-cover"
						/>
						<AvatarFallback>
							{user.name.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col flex-1 text-left text-sm leading-tight">
						<p className="truncate">{user.name}</p>
						<p className="text-muted-foreground truncate text-xs">
							panicz@gmail.com
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
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
