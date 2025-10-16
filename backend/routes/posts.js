const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

// Ensure uploads directory exists
const uploadsPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const fileFilter = (req, file, cb) => {
  if (/^image\/(jpe?g|png|gif|webp)$/i.test(file.mimetype)) return cb(null, true);
  return cb(new Error('Only image files are allowed'));
};

const upload = multer({ storage, fileFilter });

// Create post
router.post('/', protect, upload.single('image'), async (req, res, next) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      image: imagePath,
    });
    res.status(201).json(post);
  } catch (err) { next(err); }
});

// My posts
router.get('/mine', protect, async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) { next(err); }
});

// All posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) { next(err); }
});

// Update
router.put('/:id', protect, upload.single('image'), async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (String(post.author) !== String(req.user.id)) return res.status(403).json({ message: 'Forbidden' });
    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.file) post.image = `/uploads/${req.file.filename}`;
    await post.save();
    res.json(post);
  } catch (err) { next(err); }
});

// Delete
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (String(post.author) !== String(req.user.id)) return res.status(403).json({ message: 'Forbidden' });
    await post.deleteOne();
    res.json({ success: true });
  } catch (err) { next(err); }
});

// Like toggle
router.post('/:id/like', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const i = post.likes.findIndex(u => String(u) === String(req.user.id));
    if (i >= 0) post.likes.splice(i, 1); else post.likes.push(req.user.id);
    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) { next(err); }
});

// Comment
router.post('/:id/comment', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ author: req.user.id, text: req.body.text });
    await post.save();
    res.json({ comments: post.comments });
  } catch (err) { next(err); }
});

module.exports = router;
