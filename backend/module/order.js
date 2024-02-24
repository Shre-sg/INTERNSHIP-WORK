// order.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // Import your database connection

// Order Placement Endpoint
router.post('/place-order', (req, res) => {
  const { userId, products } = req.body;

  // Begin transaction to ensure atomicity
  db.beginTransaction((transactionError) => {
    if (transactionError) {
      console.error('Error beginning transaction:', transactionError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Insert order into orders table
    db.query('INSERT INTO orders (user_id) VALUES (?)', [userId], (orderError, orderResults) => {
      if (orderError) {
        console.error('Error inserting order:', orderError);
        return db.rollback(() => {
          res.status(500).json({ error: 'Internal Server Error' });
        });
      }

      const orderId = orderResults.insertId;

      // Insert order items into order_items table
      const values = products.map((product) => [orderId, product.productId, product.quantity]);
      db.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES ?', [values], (orderItemsError, orderItemsResults) => {
        if (orderItemsError) {
          console.error('Error inserting order items:', orderItemsError);
          return db.rollback(() => {
            res.status(500).json({ error: 'Internal Server Error' });
          });
        }

        // Commit the transaction
        db.commit((commitError) => {
          if (commitError) {
            console.error('Error committing transaction:', commitError);
            return db.rollback(() => {
              res.status(500).json({ error: 'Internal Server Error' });
            });
          }

          res.status(200).json({ message: 'Order placed successfully', orderId });
        });
      });
    });
  });
});

module.exports = router;
