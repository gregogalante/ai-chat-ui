import React, { useState } from 'react'
import { TextArea, Button, Form } from '@carbon/react'
import { Send } from '@carbon/icons-react'
import { useChatContext } from './ChatContext'
import { useLayout } from '../../contexts/LayoutContext'

const MessageInput = () => {
  const { isMobile } = useLayout()
  const { sendUserMessage, isLoading } = useChatContext()
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    const message = inputValue.trim()
    if (message && !isLoading) {
      sendUserMessage(message)
      setInputValue('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ 
      padding: '1rem',
      borderTop: '1px solid var(--cds-border-subtle)',
    }}>
      <Form onSubmit={(e) => { e.preventDefault(); handleSend() }}>
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem',
          alignItems: isMobile ? 'stretch' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          <div style={{ flex: 1 }}>
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrivi un messaggio... (Enter per inviare, Shift+Enter per andare a capo)"
              rows={3}
              style={{ 
                width: '100%',
                resize: 'vertical',
                minHeight: '80px',
                maxHeight: '200px'
              }}
              disabled={isLoading}
            />
          </div>
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'flex-end' : 'center'
            }}
          >
            <Button
              kind="primary"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              style={{ 
                minHeight: isMobile ? 'auto' : '80px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Send size={16} />
              Invia
            </Button>
          </div>
        </div>
        
        <div style={{ 
          fontSize: '0.75rem', 
          color: '#6f6f6f', 
          marginTop: '0.5rem',
          textAlign: isMobile ? 'center' : 'left',
        }}>
          Premi Enter per inviare, Shift+Enter per andare a capo
        </div>
      </Form>
    </div>
  )
}

export default MessageInput
