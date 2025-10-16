# Backend (MEVN travel) - brief instructions

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Start dev server:
   ```
   npm run dev
   ```
4. Seed demo data:
   ```
   npm run seed
   ```
API base path: http://localhost:5000/api
Routes:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/packages
- GET /api/packages/:id
- POST /api/packages (admin)
- PUT /api/packages/:id (admin)
- DELETE /api/packages/:id (admin)
- POST /api/bookings (authenticated)
- GET /api/bookings/mine (authenticated)


New endpoints added:
- GET /api/quizzes
- POST /api/quizzes (admin)
- GET /api/polls
- POST /api/polls (admin)
- POST /api/polls/:id/vote (protected)
- POST /api/plans (protected) - save budget plan
- GET /api/plans/mine (protected) - list user's saved plans
