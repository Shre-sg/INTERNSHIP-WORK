// cart.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // Import your database connection

// Add Product to Cart Endpoint
router.post('/add', (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Check if the product is already in the user's cart
  db.query('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId], (error, results) => {
    if (error) {
      console.error('Error checking cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        // If product already exists in the cart, update quantity
        const updatedQuantity = results[0].quantity + quantity;
        db.query('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', [updatedQuantity, userId, productId], (updateError, updateResults) => {
          if (updateError) {
            console.error('Error updating cart:', updateError);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(200).json({ message: 'Product quantity updated in cart' });
          }
        });
      } else {
        // If product does not exist in the cart, insert new entry
        db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity], (insertError, insertResults) => {
          if (insertError) {
            console.error('Error adding product to cart:', insertError);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(200).json({ message: 'Product added to cart' });
          }
        });
      }
    }
  });
});

// View Cart Endpoint
router.get('/view/:userId', (req, res) => {
  const userId = req.params.userId;

  // Fetch products in user's cart
  db.query('SELECT * FROM cart WHERE user_id = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Update Cart Quantity Endpoint
router.put('/update/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const newQuantity = req.body.quantity;

  // Update quantity of a product in the user's cart
  db.query('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', [newQuantity, userId, productId], (error, results) => {
    if (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Cart updated successfully' });
    }
  });
});

// Remove Product from Cart Endpoint
router.delete('/remove/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  // Remove product from the user's cart
  db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId], (error, results) => {
    if (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Product removed from cart' });
    }
  });
});

module.exports = router;
