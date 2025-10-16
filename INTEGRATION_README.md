Integration summary
- Backend was added at `backend/` (Node.js + Express + Mongoose).
- Frontend .env.development file set to point to http://localhost:5000 by default.
- A helper axios instance was added at `src/services/api.js` (if your frontend has src/).
- To run locally:
  1. In backend: copy .env.example -> .env and set MONGO_URI and JWT_SECRET, then `npm install` and `npm run dev`.
  2. In frontend: `npm install` and `npm run serve` (or `npm run dev` depending on your project). Make sure VUE_APP_API_URL is correct.
- Seed script available: `cd backend && npm run seed`.
