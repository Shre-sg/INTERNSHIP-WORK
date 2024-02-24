// orderDetails.js

const express = require('express');
const router = express.Router();
const db = require('./db'); 

// Order Details 
router.get('/:orderId', (req, res) => {
  const orderId = req.params.orderId;

  // Fetch detailed specific order by its ID
  db.query('SELECT * FROM orders WHERE id = ?', [orderId], (error, orderResults) => {
    
    if (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
    else {
    
      if (orderResults.length === 0) {
        res.status(404).json({ error: 'Order not found' });
      } 
      else {
        // Fetch order items with the order
        db.query('SELECT * FROM order_items WHERE order_id = ?', [orderId], (itemsError, itemsResults) => {
          
          if (itemsError) {
            console.error('Error fetching order items:', itemsError);
            res.status(500).json({ error: 'Internal Server Error' });
          } 
          else {
            const orderDetails = {
              order: orderResults[0],
              items: itemsResults
            };
            res.status(200).json(orderDetails);
          }
        });
      }
    }
  });
});

module.exports = router;
