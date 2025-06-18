import React from 'react'
import { IconButton, Tooltip } from '@carbon/react'
import { TrashCan, Edit, Renew } from '@carbon/icons-react'
import { useChatContext } from './ChatContext'
import { useLayout } from '../../contexts/LayoutContext'

const MessageActions = ({ message }) => {
  const { theme } = useLayout()
  const { deleteMessage, editMessage, refreshMessage } = useChatContext()
  const isUser = message.type === 'user'

  const handleDelete = () => {
    deleteMessage(message.id)
  }

  const handleEdit = () => {
    editMessage(message.id)
  }

  const handleRefresh = () => {
    refreshMessage(message.id)
  }

  return (
    <div style={{ 
      display: 'flex', 
      gap: '0.25rem',
      backgroundColor: theme == 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.025)',
    }}>
      {/* Elimina messaggio */}
      <IconButton
        kind="ghost"
        size="sm"
        onClick={handleDelete}
        label="Elimina"
      >
        <TrashCan size={16} />
      </IconButton>

      {isUser && (
        <>
          {/* Modifica messaggio */}
          <IconButton
            kind="ghost"
            size="sm"
            onClick={handleEdit}
            disabled={message.isEditing}
            label="Modifica"
          >
            <Edit size={16} />
          </IconButton>

          {/* Rigenera risposta */}
          <IconButton
            kind="ghost"
            size="sm"
            onClick={handleRefresh}
            label="Rigenera"
          >
            <Renew size={16} />
          </IconButton>
        </>
      )}
    </div>
  )
}

export default MessageActions
