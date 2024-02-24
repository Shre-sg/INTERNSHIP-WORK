// orderHistory.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // Import your database connection

// Order History Endpoint
router.get('/history/:userId', (req, res) => {
  const userId = req.params.userId;

  // Fetch order history for the authenticated user
  db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error fetching order history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
