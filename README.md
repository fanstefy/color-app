# Color Manager App

## Overview

A React + Typescript + TailwindCSS application to manage colors, allowing users to add, delete, and search colors with a smooth and modern UI.

## Features

✅ Add Colors – Users can add a color with a name and a hex code (#FFFFFF format). \
✅ Delete Colors – Remove colors from the list instantly. \
✅ Search Colors – Filter colors dynamically by name or hex code. \
✅ Debounced Search – Efficient searching using lodash debounce. \
✅ Modern UI – Designed with TailwindCSS, featuring a color picker. \
✅ React Query – For API caching and automatic updates. \
✅ SQLite Database – Persistent color storage with Sequelize ORM.

## Tech Stack

Frontend: React + Vite + TypeScript + TailwindCSS \
State Management: React Query \
Backend: Node.js + Express + SQLite (Sequelize ORM) \
API Calls: Axios \
UI Components: Lucide Icons, React Color Picker

## Installation & Setup

1️⃣ Clone the repository

### `git clone git@github.com:fanstefy/color-app.git`

### `cd color-app`

2️⃣ Set up environment variables:
Create .env file in backend/:

### `PORT=5000`

Create .env file in frontend/:

### `VITE_API_URL=http://localhost:5000`

3️⃣ Run the backend server:

### `cd backend`

### `npm install`

### `npm run dev`

4️⃣ Run the frontend:

### `cd frontend`

### `npm install`

### `npm run dev`

5️⃣ Access the app:

### Open http://localhost:5173/ in your browser.
