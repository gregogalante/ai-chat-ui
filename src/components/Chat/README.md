# ChatComponent - Documentazione

## Struttura dei Componenti

La componente `ChatComponent` è stata sviluppata con una architettura modulare che include i seguenti sotto-componenti:

### 1. ChatComponent.jsx
Componente principale che funge da container per l'intera chat. Utilizza il `ChatProvider` per fornire lo stato e le funzioni di gestione a tutti i sotto-componenti.

### 2. Chat/ChatContext.jsx
Context React che gestisce:
- **Stato dei messaggi**: Array di messaggi con metadati
- **Stato di caricamento**: Indica quando l'AI sta elaborando una risposta
- **Funzioni di gestione**:
  - `sendUserMessage()`: Invia un nuovo messaggio utente
  - `editMessage()`, `saveEditedMessage()`, `cancelEdit()`: Gestione modifica inline
  - `deleteMessage()`: Eliminazione messaggi
  - `refreshMessage()`: Rigenera risposta AI
  - `setMessageFeedback()`: Gestione feedback sui messaggi AI

### 3. Chat/MessagesArea.jsx
Area di visualizzazione dei messaggi che:
- Renderizza tutti i messaggi usando `MessageItem`
- Mostra un indicatore di caricamento quando l'AI sta scrivendo
- Gestisce lo scroll automatico

### 4. Chat/MessageItem.jsx
Componente per singoli messaggi che:
- Distingue visivamente messaggi utente vs AI
- Mostra timestamp
- Include `MessageActions` (action bar)
- Include `MessageBottomBar` per messaggi AI
- Supporta modifica inline con `MessageEditor`

### 5. Chat/MessageActions.jsx
Barra delle azioni (top-right) che include:
- **Per messaggi utente**: Elimina, Modifica, Rigenera risposta
- **Per messaggi AI**: Elimina
- Tooltip per ogni azione

### 6. Chat/MessageEditor.jsx
Editor inline per modificare messaggi utente:
- TextArea ridimensionabile
- Pulsanti Salva/Annulla
- Shortcuts: Ctrl+Enter (salva), Esc (annulla)
- Auto-focus sul campo

### 7. Chat/MessageBottomBar.jsx
Barra inferiore per messaggi AI che include:
- **Feedback**: Pulsanti pollice su/giù con modal per commenti
- **File scaricabili**: Lista di allegati con icone download
- **Stato feedback**: Visualizza feedback già inviato

### 8. Chat/MessageInput.jsx
Area di input per nuovi messaggi:
- TextArea ridimensionabile
- Pulsante di invio
- Shortcuts: Enter (invia), Shift+Enter (nuova riga)
- Disabilitato durante il caricamento

## Funzionalità Implementate

### ✅ Messaggi Utente
- [x] Visualizzazione con stile distintivo (blu, allineato a destra)
- [x] Eliminazione messaggio
- [x] Modifica inline con editor dedicato
- [x] Rigenera risposta AI

### ✅ Messaggi AI
- [x] Visualizzazione con stile distintivo (grigio, allineato a sinistra)
- [x] Eliminazione messaggio
- [x] Feedback positivo/negativo con commenti opzionali
- [x] File scaricabili allegati

### ✅ Interfaccia Generale
- [x] Area messaggi con scroll
- [x] Input per nuovi messaggi
- [x] Indicatore di caricamento
- [x] Responsive design
- [x] Utilizzo completo del design system Carbon

### ✅ Stato e Persistenza
- [x] Context React per gestione stato
- [x] Simulazione chiamate API
- [x] Messaggi di esempio per testing

## Tecnologie Utilizzate

- **React 19**: Hooks moderni e functional components
- **Carbon Design System**: Componenti UI, icone e stili
- **JavaScript Standard Style**: Formattazione del codice
- **Context API**: Gestione stato senza Redux

## Note Tecniche

1. **Stili**: Utilizzati stili inline come richiesto, nessun CSS custom
2. **Responsività**: Layout flessibile che si adatta a diverse dimensioni
3. **Accessibilità**: Tooltip, labels appropriati, focus management
4. **Performance**: Context ottimizzato, rendering condizionale
5. **UX**: Feedback visivo, shortcuts da tastiera, stati di caricamento

## Personalizzazione

Per modificare il comportamento della chat:

1. **API Integration**: Sostituire la simulazione in `ChatContext.jsx` con chiamate API reali
2. **Stili**: Modificare gli stili inline nei componenti
3. **Nuove funzionalità**: Aggiungere al context e ai componenti correlati
4. **File handling**: Implementare upload/download reale in `MessageBottomBar.jsx`
