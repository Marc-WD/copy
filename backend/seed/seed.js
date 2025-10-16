/*
  Simple seed script to populate demo data.
  Usage: node seed/seed.js (run from backend/)
*/
const mongoose = require('mongoose');
const pkg = require('../models/TravelPackage');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Quiz = require('../models/Quiz');
const Poll = require('../models/Poll');
const BudgetPlan = require('../models/BudgetPlan');
const bcrypt = require('bcryptjs');

async function run(){
  await mongoose.connect(process.env.MONGO_URI);
  console.log('connected');

  await pkg.deleteMany({});
  await User.deleteMany({});
  await Booking.deleteMany({});

  const adminPass = await bcrypt.hash('admin123',10);
  const userPass = await bcrypt.hash('user123',10);

  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'admin' });
  const user = await User.create({ name: 'User', email: 'user@example.com', password: userPass, role: 'user' });

  const p1 = await pkg.create({ title: 'Discover Bali', destination: 'Bali', description: 'Beach paradise', price: 499, durationDays: 5, tags: ['beach','relax'] });
  const p2 = await pkg.create({ title: 'Tokyo Highlights', destination: 'Tokyo', description: 'City tour', price: 899, durationDays: 7, tags: ['city','culture'] });

  await Booking.create({ user: user._id, travelPackage: p1._id, guests: 2, totalPrice: 998, status: 'confirmed' });

  await Review.create({ user: user._id, travelPackage: p1._id, text: 'Amazing place! Highly recommended.', rating: 5 });

  await Quiz.create({ question: 'What is the capital of Pakistan?', options: [{text:'Lahore'},{text:'Karachi'},{text:'Islamabad'},{text:'Peshawar'}], correctIndex: 2 });

  await Poll.create({ question: 'Which city is best for desi food', options: [{text:'Lahore'},{text:'Gujranwala'},{text:'Karachi'}] });

  await BudgetPlan.create({ user: user._id, city: 'Gujranwala', transport: 'Bus', hotelRating: '3 Stars', foodType: 'Desi', numberOfRooms: 1, numberOfPersons: 1, numberOfDays: 1, totalCost: 2200 });

  console.log('seeded');
  process.exit(0);
}

run().catch(e=>{console.error(e); process.exit(1);});
