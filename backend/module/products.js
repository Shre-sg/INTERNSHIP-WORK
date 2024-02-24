// products.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // Import your database connection

// Product Listing Endpoint
router.get('/:categoryId/products', (req, res) => {
  const categoryId = req.params.categoryId;

  // Fetch products from the database based on category ID
  db.query('SELECT title, price, description, availability FROM products WHERE category_id = ?', [categoryId], (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
