const express = require('express');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, async (req, res, next) => {
  try {
    const b = await Booking.create({ ...req.body, user: req.user.id });
    res.status(201).json(b);
  } catch (err) { next(err); }
});

router.get('/mine', protect, async (req, res, next) => {
  try {
    const items = await Booking.find({ user: req.user.id }).populate('travelPackage');
    res.json(items);
  } catch (err) { next(err); }
});

module.exports = router;
