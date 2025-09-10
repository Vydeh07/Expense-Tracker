# Personal Finance Tracker (MERN)

Simple personal finance tracker built with:
- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: React + Vite

## Setup

### Backend
1. `cd backend`
2. `update .env with .envexample`
3. `npm install`
4. `npm run dev` 

### Frontend
1. `cd client`
2. `npm install`
3. create `.env` with `VITE_API_URL=http://localhost:5000/api`
4. `npm run dev` 

## API
Base: `/api`

- `GET /transactions` 
- `GET /transactions/:id` 
- `POST /transactions`
- `PUT /transactions/:id` 
- `DELETE /transactions/:id` 


