import { MessageItem } from "@/modules/dashboard/ui/components/message/message-item"

const messages = [ 
  { 
    id: 1,
    message: "fdafafasfaf",
    date: new Date(),
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    userName: "Panicz"
  },
  { 
    id: 2,
    message: "fdadafafasfaf",
    date: new Date(),
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    userName: "Panicz"
  },
  { 
    id: 3,
    message: "fdafadafasfaf",
    date: new Date(),
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    userName: "Panicz"
  }
]

export const ChannelMessageList = () => { 
  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto px-4">
        {messages.map((message) => ( 
          <MessageItem
            key={message.id}
            {...message}
          />
        ))}
      </div>
    </div>
  )
}