const express = require('express');
const router = express.Router();
const Package = require('../models/Package'); // ✅ Adjust path if your schema differs

// @route   GET /api/top-liked-posts
// @desc    Get top 3 liked packages/posts
// @access  Public
router.get('/top-liked-posts', async (req, res) => {
  try {
    const topPosts = await Package.find().sort({ likes: -1 }).limit(3);
    res.json({ data: topPosts });
  } catch (err) {
    console.error('Error fetching top liked posts:', err);
    res.status(500).json({ message: 'Server error while fetching top liked posts' });
  }
});

module.exports = router;
