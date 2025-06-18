import React from 'react'
import { useChatContext } from './ChatContext'
import MessageItem from './MessageItem'
import { Loading } from '@carbon/react'

const MessagesArea = () => {
  const { messages, isLoading } = useChatContext()

  return (
    <div style={{ 
      flex: 1, 
      overflowY: 'auto', 
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {isLoading && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '1rem',
          justifyContent: 'flex-start'
        }}>
          <Loading small withOverlay={false} />
          <span>L'agente AI sta scrivendo...</span>
        </div>
      )}
    </div>
  )
}

export default MessagesArea
