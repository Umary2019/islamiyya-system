const User = require('../models/User');

const ADMIN_EMAIL = 'bargazal003@gmail.com';
const ADMIN_PASSWORD = 'Umar@2019';
const ADMIN_NAME = 'System Admin';
const ADMIN_PHONE = '0000000000';

const ensureAdmin = async () => {
  try {
    let admin = await User.findOne({ email: ADMIN_EMAIL });

    if (!admin) {
      admin = new User({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        phone: ADMIN_PHONE,
        password: ADMIN_PASSWORD,
        role: 'admin',
      });
      await admin.save();
      console.log('Default admin account created');
      return;
    }

    admin.name = ADMIN_NAME;
    admin.phone = ADMIN_PHONE;
    admin.role = 'admin';
    admin.password = ADMIN_PASSWORD;
    await admin.save();
    console.log('Default admin account synced');
  } catch (error) {
    console.error(`Failed to ensure admin account: ${error.message}`);
  }
};

module.exports = ensureAdmin;
