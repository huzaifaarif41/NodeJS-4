const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct) // (:) signals to express that it should not look for a route but it can load anything. (shopController.getProduct) is controller for what we initialize on the shop controller file.


router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart)

router.post('/cart-delete-item', shopController.postCartDeleteProduct)

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
