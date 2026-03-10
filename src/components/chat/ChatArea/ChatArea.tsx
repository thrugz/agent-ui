'use client'

import ChatInput from './ChatInput'
import MessageArea from './MessageArea'
const ChatArea = () => {
  return (
    <main className="relative m-1.5 flex flex-grow flex-col rounded-xl bg-background">
      <MessageArea />
      <div className="sticky bottom-0 ml-9 px-4 pb-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:ml-0">
        <ChatInput />
      </div>
    </main>
  )
}

export default ChatArea
