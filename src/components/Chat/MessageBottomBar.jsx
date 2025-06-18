import React, { useState } from 'react'
import { 
  Button, 
  ButtonSet, 
  TextArea, 
  Modal,
  IconButton,
  Tooltip,
  Link
} from '@carbon/react'
import { ThumbsUp, ThumbsDown, DocumentDownload } from '@carbon/icons-react'
import { useChatContext } from './ChatContext'

const MessageBottomBar = ({ message }) => {
  const { setMessageFeedback } = useChatContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState(null)
  const [feedbackComment, setFeedbackComment] = useState('')

  const handleFeedbackClick = (type) => {
    setFeedbackType(type)
    setIsModalOpen(true)
  }

  const handleSubmitFeedback = () => {
    setMessageFeedback(message.id, {
      type: feedbackType,
      comment: feedbackComment.trim()
    })
    setIsModalOpen(false)
    setFeedbackComment('')
  }

  const handleCancelFeedback = () => {
    setIsModalOpen(false)
    setFeedbackComment('')
    setFeedbackType(null)
  }

  const hasFiles = message.files && message.files.length > 0
  const hasFeedback = message.feedback !== null

  if (!hasFiles && hasFeedback) {
    return null
  }

  return (
    <>
      <div style={{ 
        marginTop: '0.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        {/* File scaricabili */}
        {hasFiles && (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
              File allegati:
            </span>
            {message.files.map((file, index) => (
              <Link
                key={index}
                href={file.url}
                download={file.name}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  textDecoration: 'none'
                }}
              >
                <DocumentDownload size={16} />
                {file.name}
              </Link>
            ))}
          </div>
        )}

        {/* Feedback buttons */}
        {!hasFeedback && (
          <ButtonSet style={{ flexShrink: 0 }}>
            <IconButton
              kind="ghost"
              size="sm"
              label="Feedback positivo"
              onClick={() => handleFeedbackClick('up')}
              style={{ minHeight: '32px', width: '32px' }}
            >
              <ThumbsUp size={16} />
            </IconButton>
            <IconButton
              kind="ghost"
              size="sm"
              label="Feedback negativo"
              onClick={() => handleFeedbackClick('down')}
              style={{ minHeight: '32px', width: '32px' }}
            >
              <ThumbsDown size={16} />
            </IconButton>
          </ButtonSet>
        )}

        {/* Feedback già dato */}
        {hasFeedback && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#6f6f6f'
          }}>
            {message.feedback.type === 'up' ? (
              <ThumbsUp size={16} style={{ color: '#198038' }} />
            ) : (
              <ThumbsDown size={16} style={{ color: '#da1e28' }} />
            )}
            <span>
              Feedback inviato
              {message.feedback.comment && ': "' + truncateText(message.feedback.comment, 25) + '"'}
            </span>
          </div>
        )}
      </div>

      {/* Modal per feedback */}
      <Modal
        open={isModalOpen}
        onRequestClose={handleCancelFeedback}
        modalHeading={`Feedback ${feedbackType === 'up' ? 'positivo' : 'negativo'}`}
        primaryButtonText="Invia feedback"
        secondaryButtonText="Annulla"
        onRequestSubmit={handleSubmitFeedback}
        onSecondarySubmit={handleCancelFeedback}
        size="sm"
      >
        <p style={{ marginBottom: '1rem' }}>
          {feedbackType === 'up' 
            ? 'Cosa ti è piaciuto di questa risposta?' 
            : 'Cosa potrebbe essere migliorato in questa risposta?'
          }
        </p>
        <TextArea
          value={feedbackComment}
          onChange={(e) => setFeedbackComment(e.target.value)}
          placeholder="Commento opzionale..."
          rows={3}
          style={{ width: '100%' }}
        />
      </Modal>
    </>
  )
}

export default MessageBottomBar

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}