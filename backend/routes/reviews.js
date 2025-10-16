const express = require('express');
const Review = require('../models/Review');
const TravelPackage = require('../models/TravelPackage');
const { protect } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });

// create a review for a package
router.post('/', protect, async (req, res, next) => {
  try {
    const packageId = req.params.packageId;
    const pkg = await TravelPackage.findById(packageId);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    const review = await Review.create({ user: req.user.id, travelPackage: packageId, text: req.body.text, rating: req.body.rating || 5 });
    res.status(201).json(review);
  } catch (err) { next(err); }
});

// list reviews for a package
router.get('/', async (req, res, next) => {
  try {
    const packageId = req.params.packageId;
    const items = await Review.find({ travelPackage: packageId }).populate('user', 'name');
    res.json(items);
  } catch (err) { next(err); }
});

module.exports = router;
