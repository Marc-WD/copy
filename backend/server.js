require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/auth');
const packagesRoutes = require('./routes/packages');
const bookingsRoutes = require('./routes/bookings');
const quizzesRoutes = require('./routes/quizzes');
const pollsRoutes = require('./routes/polls');
const plansRoutes = require('./routes/plans');
const reviewsRoutes = require('./routes/reviews');

// ✅ Import new route for Top Liked Posts
const topLikedRoutes = require('./routes/topLikedPosts');

const app = express();

// ====== MIDDLEWARES ======
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiter (to prevent abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

// ====== ROUTES ======

// Authentication, Packages, etc.
app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', authRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/packages/:packageId/reviews', reviewsRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/polls', pollsRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/upload', require('./routes/upload'));

// ✅ NEW: Top liked posts (for your frontend Vue “TopLikedPosts.vue”)
app.use('/api', topLikedRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// ====== ERROR HANDLER ======
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// ====== SERVER INIT ======
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('✅ Mongo connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });
