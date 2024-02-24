// categories.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // Import your database connection

// Category Listing Endpoint
router.get('/', (req, res) => {
  // Fetch categories from the database
  db.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
