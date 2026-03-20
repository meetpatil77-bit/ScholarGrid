# 📚 StudyHive — Frontend

A mobile-first study collaboration platform built with **React + Vite**.

---

## 🗂️ Project Structure

```
studyhive/
├── index.html                  ← HTML entry point
├── vite.config.js              ← Vite + PWA config
├── package.json                ← Dependencies
├── README.md
└── src/
    ├── main.jsx                ← React root
    ├── App.jsx                 ← App shell + routing
    ├── index.css               ← Global styles + animations
    │
    ├── data/
    │   └── mockData.js         ← All mock users, chats, notes
    │
    ├── utils/
    │   └── helpers.js          ← avg(), getUser(), formatTime()...
    │
    ├── components/             ← Reusable UI components
    │   ├── Avatar.jsx          ← User avatar circle
    │   ├── Stars.jsx           ← Star rating (display + interactive)
    │   ├── Badge.jsx           ← PDF / PPT / DOC file type badge
    │   └── BottomNav.jsx       ← Bottom navigation bar
    │
    └── screens/                ← Full page screens
        ├── LoginScreen.jsx     ← Login with role toggle
        ├── ChatListScreen.jsx  ← Channel list
        ├── ChatRoom.jsx        ← WhatsApp-style chat room
        ├── NotesScreen.jsx     ← Notes feed (Top/Recent/Popular)
        ├── NoteDetail.jsx      ← Note view + rate + comment + download
        ├── UploadScreen.jsx    ← Upload notes form
        └── ProfileScreen.jsx   ← Profile, stats, settings
```

---

## 🚀 How to Run

### Option 1 — Antigravity (Recommended for demo)
1. Open **antigravity.sh** or your Antigravity IDE
2. Upload/paste all files maintaining the folder structure above
3. It will auto-detect Vite and run it

### Option 2 — Run locally on your laptop
```bash
# 1. Make sure Node.js is installed (v18+)
node --version

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Option 3 — Build for production
```bash
npm run build
# Output goes to /dist folder
# Deploy to Vercel, Netlify, or any static host
```

### Option 4 — Deploy to Vercel (free)
```bash
npm install -g vercel
vercel
# Follow prompts → get a live URL instantly
```

---

## 📱 Run on Your Phone

### Method A — Same Wi-Fi network
```bash
npm run dev -- --host
# Opens on: http://YOUR_IP:5173
# Type that URL on your phone browser
```

### Method B — Deploy to Vercel
```bash
vercel
# Get URL like: https://studyhive-abc.vercel.app
# Open on any phone browser
```

### Method C — PWA Install
Once opened in Chrome on Android:
1. Tap the 3-dot menu
2. Tap **"Add to Home Screen"**
3. App launches fullscreen like a native app!

---

## 🔧 Connecting to a Real Backend

Replace mock data calls in `src/data/mockData.js` with Axios API calls:

```js
// Example: replace NOTES with API call
import axios from 'axios'
const API = 'http://localhost:5000/api'

export const fetchNotes   = () => axios.get(`${API}/notes`)
export const uploadNote   = (data) => axios.post(`${API}/notes/upload`, data)
export const rateNote     = (id, rating) => axios.post(`${API}/notes/${id}/rate`, { rating })
export const addComment   = (id, text) => axios.post(`${API}/notes/${id}/comment`, { text })
export const sendMessage  = (chatId, text) => axios.post(`${API}/chat/send`, { chatId, text })
```

For real-time chat, connect Socket.io in `ChatRoom.jsx`:
```js
import { io } from 'socket.io-client'
const socket = io('http://localhost:5000')
socket.emit('join', chatId)
socket.on('message', (msg) => setMsgs(prev => [...prev, msg]))
```

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|------------------------|
| Framework | React 18 + Vite 5      |
| Styling   | Inline CSS (mobile-first) |
| PWA       | vite-plugin-pwa        |
| Font      | Plus Jakarta Sans      |
| Icons     | Emoji (no library needed) |

---

## 🔒 Planned Backend (Node.js)

| Feature       | Endpoint               |
|---------------|------------------------|
| Register      | POST /auth/register    |
| Login         | POST /auth/login       |
| Upload Note   | POST /notes/upload     |
| Get Notes     | GET  /notes            |
| Rate Note     | POST /notes/:id/rate   |
| Comment       | POST /notes/:id/comment |
| Chat History  | GET  /chat/:id/history |
| Send Message  | POST /chat/send        |

---

## 🎓 Demo Credentials
Any email + password works in demo mode.
- **Student login**: any email → logs in as Arjun Sharma
- **Teacher login**: toggle Teacher → logs in as Prof. Mehta
