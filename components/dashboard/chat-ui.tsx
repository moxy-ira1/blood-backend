"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { messages as initialMessages, type Message } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { MessageSquare, Send, UserCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ChatUI() {
  const { user } = useAuth()
  const [messageData, setMessageData] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messageData])

  const handleSend = () => {
    if (!newMessage.trim() || !user) return

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role as "worker" | "donor",
      content: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessageData([...messageData, message])
    setNewMessage("")
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <Card className="bg-card border-border flex flex-col h-[600px]">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <MessageSquare className="h-5 w-5 text-primary" />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messageData.map((message) => {
              const isCurrentUser = message.senderId === user?.id
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    isCurrentUser ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback
                      className={cn(
                        "text-xs",
                        message.senderRole === "worker"
                          ? "bg-chart-2/20 text-chart-2"
                          : "bg-chart-3/20 text-chart-3"
                      )}
                    >
                      {message.senderName.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "flex flex-col max-w-[70%]",
                      isCurrentUser ? "items-end" : "items-start"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        {message.senderName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2",
                        isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="border-t border-border p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex gap-2"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-input border-border"
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export function ChatList() {
  const conversations = [
    {
      id: "1",
      name: "James Wilson",
      role: "Worker",
      lastMessage: "Your appointment is confirmed for tomorrow.",
      time: "10:45 AM",
      unread: 2,
    },
    {
      id: "2",
      name: "Lisa Anderson",
      role: "Worker",
      lastMessage: "Thank you for your donation!",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: "3",
      name: "Support Team",
      role: "Admin",
      lastMessage: "Welcome to BloodBank!",
      time: "Mar 10",
      unread: 0,
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <MessageSquare className="h-5 w-5 text-primary" />
          Conversations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-left"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {conversation.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {conversation.name}
                </p>
                <span className="text-xs text-muted-foreground shrink-0">
                  {conversation.time}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
                {conversation.unread > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground shrink-0">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
