const app = require('../app');
const connectDB = require('../config/database');
const ensureAdmin = require('../config/ensureAdmin');

let initialized = false;

async function initialize() {
  if (initialized) return;

  await connectDB();
  await ensureAdmin();
  initialized = true;
}

module.exports = async (req, res) => {
  try {
    await initialize();
    return app(req, res);
  } catch (error) {
    console.error('Serverless init error:', error);
    return res.status(500).json({
      message: 'Server initialization failed',
      error: error.message,
    });
  }
};
