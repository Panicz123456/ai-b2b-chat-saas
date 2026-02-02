import Image from "next/image"

import { Avatar, AvatarFallback} from "@/components/ui/avatar"

const members = [
  {
    id: 1,
    name: "Panicz",
    imageUrl: "https://avatars.githubusercontent.com/u/124599?v=4",
    email: "Panicz@gmail.com"
  },
]

export const ChannelMembersList = () => {
  return (
    <div className="space-y-0.5 py-1">
      {members.map((member) => ( 
        <div key={member.id} className="px-3 py-2 hover:bg-accent cursor-pointer flex items-center space-x-3">
          <div className="relative">
            <Avatar className="size-8 relative">
              <Image
                src={member.imageUrl}
                alt="member Profile image"
                className="object-cover"
                fill
              />
              <AvatarFallback>
                {member.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-h-0">
            <p className="text-sm font-medium truncate">{member.name}</p>
            <p className="text-sx text-muted-foreground truncate">{member.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}