import { useState } from 'react'
import LoginScreen   from './screens/LoginScreen'
import ChatListScreen from './screens/ChatListScreen'
import ChatRoom       from './screens/ChatRoom'
import NotesScreen    from './screens/NotesScreen'
import NoteDetail     from './screens/NoteDetail'
import UploadScreen   from './screens/UploadScreen'
import ProfileScreen  from './screens/ProfileScreen'
import BottomNav      from './components/BottomNav'
import { NOTES }      from './data/mockData'

export default function App() {
  const [user,      setUser]      = useState(null)
  const [tab,       setTab]       = useState('chat')
  const [openChat,  setOpenChat]  = useState(null)
  const [viewNote,  setViewNote]  = useState(null)
  const [notes,     setNotes]     = useState(JSON.parse(JSON.stringify(NOTES)))

  // ── helpers ──────────────────────────────────────────────
  const goTab = (t) => {
    setTab(t)
    setOpenChat(null)
    setViewNote(null)
  }

  const handleUpdateNote = (updated) => {
    setNotes(prev => prev.map(n => n.id === updated.id ? updated : n))
    setViewNote(updated)
  }

  const handleNoteAdded = (newNote) => {
    setNotes(prev => [newNote, ...prev])
  }

  const hideNav = (tab === 'chat' && openChat) || (tab === 'notes' && viewNote)

  // ── login gate ───────────────────────────────────────────
  if (!user) return <LoginScreen onLogin={setUser} />

  // ── main shell ───────────────────────────────────────────
  return (
    <div className="noise-overlay" style={{
      maxWidth: 480,
      margin: '0 auto',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
      position: 'relative',
      borderLeft: '1px solid var(--border-subtle)',
      borderRight: '1px solid var(--border-subtle)',
      boxShadow: '0 0 100px rgba(0,0,0,0.8)',
    }}>
      {/* Dynamic Background elements handled in CSS or screens for better performance */}


      {/* ── content area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', zIndex: 1 }}>

        {/* CHANNELS */}
        {tab === 'chat' && !openChat && (
          <ChatListScreen onOpen={setOpenChat} />
        )}
        {tab === 'chat' && openChat && (
          <ChatRoom
            chat={openChat}
            currentUser={user}
            onBack={() => setOpenChat(null)}
          />
        )}

        {/* NOTES */}
        {tab === 'notes' && !viewNote && (
          <NotesScreen
            notes={notes}
            currentUser={user}
            onViewNote={setViewNote}
          />
        )}
        {tab === 'notes' && viewNote && (
          <NoteDetail
            note={viewNote}
            currentUser={user}
            onBack={() => setViewNote(null)}
            onUpdate={handleUpdateNote}
          />
        )}

        {/* UPLOAD — only available for students */}
        {tab === 'upload' && (
          <UploadScreen
            currentUser={user}
            onNoteAdded={handleNoteAdded}
          />
        )}

        {/* PROFILE */}
        {tab === 'profile' && (
          <ProfileScreen
            currentUser={user}
            notes={notes}
            onLogout={() => {
              setUser(null)
              setTab('chat')
              setOpenChat(null)
              setViewNote(null)
            }}
          />
        )}
      </div>

      {/* ── bottom nav (hidden inside chat room / note detail) ── */}
      {!hideNav && (
        <BottomNav active={tab} onChange={goTab} userRole={user.role} />
      )}
    </div>
  )
}
