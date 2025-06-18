import React from 'react'
import { Tile } from '@carbon/react'
import MessageActions from './MessageActions'
import MessageBottomBar from './MessageBottomBar'
import MessageEditor from './MessageEditor'
import { useLayout } from '../../contexts/LayoutContext'

const MessageItem = ({ message }) => {
  const { isMobile, theme } = useLayout()
  const isUser = message.type === 'user'
  const isAI = message.type === 'ai'

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      maxWidth: '100%'
    }}>
      <div style={{ 
        maxWidth: isMobile ? '90%' : '70%', 
        minWidth: '200px',
        position: 'relative'
      }}>
        <Tile
          style={{
            backgroundColor: theme == 'dark' ? `rgba(255, 255, 255, ${0.05 * (isUser ? 1 : 2)})` : `rgba(0, 0, 0, ${0.025 * (isUser ? 1 : 2)})`,
          }}
        >
          {/* Message Content */}
          <div style={{ paddingRight: '2rem', marginBottom: '2rem' }}>
            {message.isEditing ? (
              <MessageEditor message={message} />
            ) : (
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {message.content}
              </div>
            )}
          </div>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0
            }}
          >
            {/* Action Bar */}
            <div>
              <MessageActions message={message} />
            </div>

            {/* Timestamp */}
            <div style={{ 
              fontSize: '0.75rem', 
              opacity: 0.7,
              paddingRight: '0.5rem',
            }}>
              {message.timestamp.toLocaleTimeString('it-IT', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </Tile>

        {/* Bottom Bar */}
        {isAI && (
          <MessageBottomBar message={message} />
        )}
      </div>
    </div>
  )
}

export default MessageItem
