const express = require('express');
const BudgetPlan = require('../models/BudgetPlan');
const { protect } = require('../middleware/auth');
const router = express.Router();

// create a budget plan (save user's plan)
router.post('/', protect, async (req,res,next)=>{
  try{
    const data = { ...req.body, user: req.user.id };
    const p = await BudgetPlan.create(data);
    res.status(201).json(p);
  }catch(err){next(err)}
});

// list current user's plans
router.get('/mine', protect, async (req,res,next)=>{
  try{
    const items = await BudgetPlan.find({ user: req.user.id }).sort({createdAt:-1});
    res.json(items);
  }catch(err){next(err)}
});

module.exports = router;
