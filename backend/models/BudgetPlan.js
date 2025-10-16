const mongoose = require('mongoose');

const BudgetPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  city: String,
  transport: String,
  hotelRating: String,
  foodType: String,
  numberOfRooms: Number,
  numberOfPersons: Number,
  numberOfDays: Number,
  totalCost: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BudgetPlan', BudgetPlanSchema);
