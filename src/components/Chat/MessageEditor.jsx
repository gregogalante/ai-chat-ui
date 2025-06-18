import React, { useState, useEffect } from 'react'
import { TextArea, Button, ButtonSet } from '@carbon/react'
import { useChatContext } from './ChatContext'
import { useLayout } from '../../contexts/LayoutContext'

const MessageEditor = ({ message }) => {
  const { isMobile } = useLayout()
  const { saveEditedMessage, cancelEdit } = useChatContext()
  const [editedContent, setEditedContent] = useState(message.content)

  useEffect(() => {
    setEditedContent(message.content)
  }, [message.content])

  const handleSave = () => {
    if (editedContent.trim()) {
      saveEditedMessage(message.id, editedContent.trim())
    }
  }

  const handleCancel = () => {
    setEditedContent(message.content)
    cancelEdit(message.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <TextArea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Modifica il tuo messaggio..."
        rows={3}
        style={{ 
          width: '100%',
          marginBottom: '0.5rem',
          resize: 'vertical'
        }}
        autoFocus
      />
      
      <ButtonSet
        style={{
          marginTop: '0.5rem',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Button
          kind="primary"
          size="sm"
          onClick={handleSave}
          disabled={!editedContent.trim()}
        >
          Salva (Ctrl+Enter)
        </Button>
        <Button
          kind="secondary"
          size="sm"
          onClick={handleCancel}
        >
          Annulla (Esc)
        </Button>
      </ButtonSet>
    </div>
  )
}

export default MessageEditor
