const express = require('express');
const Package = require('../models/Package');
const TravelPackage = require('../models/TravelPackage');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// list with simple filter & pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q, destination, minPrice, maxPrice } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (destination) filter.destination = destination;
    if (minPrice) filter.price = { ...(filter.price||{}), $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...(filter.price||{}), $lte: Number(maxPrice) };
    const skip = (page-1)*limit;
    const total = await TravelPackage.countDocuments(filter);
    const items = await TravelPackage.find(filter).skip(skip).limit(Number(limit));
    res.json({ total, page: Number(page), items });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const pkg = await TravelPackage.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Not found' });
    res.json(pkg);
  } catch (err) { next(err); }
});

// admin create
router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const p = await TravelPackage.create(req.body);
    res.status(201).json(p);
  } catch (err) { next(err); }
});

// admin update
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const p = await TravelPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) { next(err); }
});

// admin delete
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    await TravelPackage.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

// toggle like
router.post('/:id/like', protect, async (req, res, next) => {
  try {
    const pkg = await TravelPackage.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    const userId = req.user.id;
    const idx = pkg.likedBy.findIndex(x => x.toString() === userId);
    if (idx === -1) {
      pkg.likedBy.push(userId);
    } else {
      pkg.likedBy.splice(idx,1);
    }
    pkg.likes = pkg.likedBy.length;
    await pkg.save();
    res.json({ likes: pkg.likes, likedBy: pkg.likedBy });
  } catch (err) { next(err); }
});

// top liked
router.get('/top/liked', async (req, res, next) => {
  try {
    const items = await TravelPackage.find().sort({ likes: -1 }).limit(3);
    res.json(items);
  } catch (err) { next(err); }
});

// ✅ LIKE a package post
router.post('/:id/like', async (req, res) => {
  try {
    const packageItem = await Package.findById(req.params.id);
    if (!packageItem) return res.status(404).json({ message: 'Package not found' });

    packageItem.likes += 1;
    await packageItem.save();

    res.json({ message: 'Package liked!', likes: packageItem.likes });
  } catch (error) {
    console.error('Error liking package:', error);
    res.status(500).json({ message: 'Server error while liking package' });
  }
});


module.exports = router;
