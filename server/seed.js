require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env');
      process.exit(1);
    }

    const existing = await User.findOne({ username: ADMIN_USERNAME });
    if (existing) {
      console.log('✅ Admin already exists');
      process.exit(0);
    }

    const user = new User({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    await user.save();
    console.log('✅ Admin created');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();