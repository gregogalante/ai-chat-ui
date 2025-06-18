import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      content: 'Ciao! Come stai?',
      timestamp: new Date(Date.now() - 10000),
      isEditing: false
    },
    {
      id: 2,
      type: 'ai',
      content: 'Ciao! Sto bene, grazie per aver chiesto. Sono un assistente AI e sono qui per aiutarti. Come posso esserti utile oggi?',
      timestamp: new Date(Date.now() - 8000),
      feedback: null,
      files: []
    },
    {
      id: 3,
      type: 'user',
      content: 'Puoi spiegarmi come funziona il machine learning?',
      timestamp: new Date(Date.now() - 5000),
      isEditing: false
    },
    {
      id: 4,
      type: 'ai',
      content: 'Certamente! Il machine learning è un campo dell\'intelligenza artificiale che permette ai computer di imparare e migliorare automaticamente attraverso l\'esperienza, senza essere esplicitamente programmati per ogni singola attività.\n\nEcco i concetti principali:\n\n1. **Algoritmi di apprendimento**: I computer utilizzano algoritmi per identificare pattern nei dati\n2. **Dati di training**: Grandi quantità di dati vengono utilizzate per "allenare" il modello\n3. **Predizioni**: Una volta addestrato, il modello può fare predizioni su nuovi dati\n\nTi ho preparato anche un documento con maggiori dettagli.',
      timestamp: new Date(Date.now() - 2000),
      feedback: null,
      files: [
        {
          name: 'machine_learning_guide.pdf',
          url: '#',
          size: '2.5 MB'
        },
        {
          name: 'esempi_algoritmi.py',
          url: '#',
          size: '15 KB'
        }
      ]
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const addMessage = (message) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      ...message
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage.id
  }

  const updateMessage = (messageId, updates) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, ...updates } : msg
    ))
  }

  const deleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId))
  }

  const sendUserMessage = async (content) => {
    const userMessageId = addMessage({
      type: 'user',
      content,
      isEditing: false
    })

    setIsLoading(true)

    // Simula una risposta dell'AI (sostituire con chiamata API reale)
    setTimeout(() => {
      addMessage({
        type: 'ai',
        content: `Questa è una risposta simulata al messaggio: "${content}"`,
        feedback: null, // { type: 'up' | 'down', comment: '' }
        files: [] // Array di file scaricabili
      })
      setIsLoading(false)
    }, 1000 + Math.random() * 2000)

    return userMessageId
  }

  const editMessage = (messageId) => {
    updateMessage(messageId, { isEditing: true })
  }

  const saveEditedMessage = async (messageId, newContent) => {
    updateMessage(messageId, { content: newContent, isEditing: false })
    
    // Trova l'indice del messaggio modificato
    const messageIndex = messages.findIndex(msg => msg.id === messageId)
    if (messageIndex !== -1) {
      // Rimuovi tutti i messaggi successivi (inclusa la vecchia risposta AI)
      setMessages(prev => prev.slice(0, messageIndex + 1))
      
      // Richiedi una nuova risposta
      setIsLoading(true)
      setTimeout(() => {
        addMessage({
          type: 'ai',
          content: `Nuova risposta al messaggio modificato: "${newContent}"`,
          feedback: null,
          files: []
        })
        setIsLoading(false)
      }, 1000 + Math.random() * 2000)
    }
  }

  const cancelEdit = (messageId) => {
    updateMessage(messageId, { isEditing: false })
  }

  const refreshMessage = async (messageId) => {
    const message = messages.find(msg => msg.id === messageId)
    if (message && message.type === 'user') {
      // Trova e rimuovi la risposta AI successiva se esiste
      const messageIndex = messages.findIndex(msg => msg.id === messageId)
      const nextMessage = messages[messageIndex + 1]
      if (nextMessage && nextMessage.type === 'ai') {
        deleteMessage(nextMessage.id)
      }
      
      // Richiedi una nuova risposta
      setIsLoading(true)
      setTimeout(() => {
        addMessage({
          type: 'ai',
          content: `Nuova risposta rigenerata per: "${message.content}"`,
          feedback: null,
          files: []
        })
        setIsLoading(false)
      }, 1000 + Math.random() * 2000)
    }
  }

  const setMessageFeedback = (messageId, feedback) => {
    updateMessage(messageId, { feedback })
  }

  const value = {
    messages,
    isLoading,
    addMessage,
    updateMessage,
    deleteMessage,
    sendUserMessage,
    editMessage,
    saveEditedMessage,
    cancelEdit,
    refreshMessage,
    setMessageFeedback
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}
