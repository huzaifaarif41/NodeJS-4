const Product = require('../models/product');
const Cart = require('../models/cart');
const res = require('express/lib/response');
const req = require('express/lib/request');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; 
  //the name you add after ":" is the name by which you can extract that data on req.params
  
  //here in the params object, it can access productId from which we can initialize in the routes folder on shop.js file. It can extract that dataon this params object. 
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        } //there is a complete product data from a product model and from cartProductData we take qty.
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts, //products is what we are sending to our cart template ejs file
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; //productId is what we gave in the name field in the product-detail.ejs file in the input.
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  }); //product is what we are retrieving from product file
  res.redirect('/cart');
};
//we have to post a product in the cart,ofcourse we need first to get a product


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
