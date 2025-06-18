import React from 'react'
import { Content } from '@carbon/react'
import { ChatProvider } from './Chat/ChatContext'
import MessagesArea from './Chat/MessagesArea'
import MessageInput from './Chat/MessageInput'
import { useLayout } from '../contexts/LayoutContext'

function ChatComponent () {
  const { headerHeight } = useLayout()

  return (
    <ChatProvider>
      <Content style={{ 
        height: `calc(100vh - ${headerHeight}px)`,
        display: 'flex',
        flexDirection: 'column',
        padding: 0
      }}>
        <MessagesArea />
        <MessageInput />
      </Content>
    </ChatProvider>
  )
}

export default ChatComponent