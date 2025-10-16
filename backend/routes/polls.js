const express = require('express');
const Poll = require('../models/Poll');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// list polls
router.get('/', async (req,res,next)=>{
  try{
    const items = await Poll.find();
    res.json(items);
  }catch(err){next(err)}
});

// admin create poll
router.post('/', protect, adminOnly, async (req,res,next)=>{
  try{
    const p = await Poll.create(req.body);
    res.status(201).json(p);
  }catch(err){next(err)}
});

// vote on poll option (protected)
router.post('/:id/vote', protect, async (req,res,next)=>{
  try{
    const poll = await Poll.findById(req.params.id);
    if(!poll) return res.status(404).json({ message: 'Poll not found' });
    const { optionIndex } = req.body;
    if(optionIndex == null || optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: 'Invalid option' });
    }
    poll.options[optionIndex].votes = (poll.options[optionIndex].votes || 0) + 1;
    await poll.save();
    res.json(poll);
  }catch(err){next(err)}
});

module.exports = router;
