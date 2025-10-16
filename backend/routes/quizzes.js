const express = require('express');
const Quiz = require('../models/Quiz');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// list quizzes
router.get('/', async (req,res,next)=>{
  try{
    const items = await Quiz.find();
    res.json(items);
  }catch(err){next(err)}
});

// admin create quiz
router.post('/', protect, adminOnly, async (req,res,next)=>{
  try{
    const q = await Quiz.create(req.body);
    res.status(201).json(q);
  }catch(err){next(err)}
});

module.exports = router;
