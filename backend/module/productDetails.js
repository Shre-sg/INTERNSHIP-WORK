// productDetails.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // Import your database connection

// Product Details Endpoint
router.get('/:productId', (req, res) => {
  const productId = req.params.productId;

  // Fetch product details from the database based on product ID
  db.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error fetching product details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
});

module.exports = router;
