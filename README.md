# Addis Software Full Stack Test Project - MERN Stack

A full-stack Song Management & Statistics Web Application built with the **MERN (MongoDB, ExpressJS, ReactJS, NodeJS)** stack, **TypeScript**, **Redux Toolkit**, **Redux-Saga**, **Emotion & Styled System**, and fully dockerized.

---

## 🚀 Key Features

### Backend (REST API)
- **Song Model**: Manages `Title`, `Artist`, `Album`, `Genre`, and automatic timestamps.
- **Full CRUD Endpoints**:
  - `POST /api/songs` - Create a new song.
  - `GET /api/songs` - List all songs (with support for search & filtering by `genre`, `artist`, `album`).
  - `GET /api/songs/:id` - Fetch single song details.
  - `PUT /api/songs/:id` - Update song details.
  - `DELETE /api/songs/:id` - Delete a song.
- **Aggregated Statistics API (`GET /api/songs/stats`)**:
  - Total number of songs, unique artists, unique albums, and unique genres.
  - Number of songs in every genre (`songsPerGenre`).
  - Number of songs and unique albums each artist has (`songsAndAlbumsPerArtist`).
  - Number of songs in each album (`songsPerAlbum`).
- **Database Seeding (`POST /api/songs/seed`)**:
  - Automatically pre-seeds MongoDB with sample songs across genres if empty on launch.

### Frontend (Client Web App)
- **TypeScript**: Strictly typed interfaces for models, API payloads, and Redux state (`no any`).
- **Redux Toolkit & Redux-Saga**:
  - State management handled by Redux Toolkit slices.
  - Asynchronous REST calls, side-effects, and auto-refreshes managed via **Redux-Saga**.
  - **Instant Live Updates**: Adding, updating, or deleting a song automatically updates both the Song List and the Statistics Dashboard without reloading the page.
- **Styling**: Emotion (`@emotion/react`, `@emotion/styled`) + `styled-system` theme tokens with a modern glassmorphism dark mode interface.
- **Filtering & Search (Bonus)**: Real-time search by keyword and dropdown filter by genre/artist.
- **Dual View Modes**: Switch between responsive Grid view cards and Table view.

---

## 🛠️ Project Structure

```text
full_stack_test/
├── backend/
│   ├── src/
│   │   ├── config/       # Database connection & auto-seeding
│   │   ├── controllers/  # CRUD & MongoDB Aggregation Pipeline stats
│   │   ├── models/       # Mongoose Song schema & TS interface
│   │   ├── routes/       # Express REST router
│   │   └── server.ts     # Express app entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, StatsOverview, SongList, SongModal, FilterBar, Notification
│   │   ├── services/     # Axios REST client
│   │   ├── store/        # Redux Toolkit slice & Redux-Saga watchers
│   │   ├── theme/        # Emotion theme tokens
│   │   ├── types/        # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---



## 💻 Running Locally (Development Mode)

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally at `mongodb://127.0.0.1:27017/song_db`

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The REST API will start at `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend web application will start at `http://localhost:3000`.

---

## 🧪 Verification & Build Checks

### Backend Build
```bash
cd backend
npm run build
```

### Frontend Typecheck & Build
```bash
cd frontend
npm run build
```
# Test_project
