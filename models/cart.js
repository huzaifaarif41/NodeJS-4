const fs = require('fs');
const { parse } = require('path');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);
module.exports = class Cart {
  static addProduct(id, productPrice) {
    //id of the product which we want to add
    //fetch the previous cart

    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //Analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct; //if we have an existing product in the cart, so we have to updated its quantity by 1.
      //add a new Product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1; //creating new property of qty.
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      } //if we have a new product in the cart

      cart.totalPrice = cart.totalPrice + +productPrice; //we updated the price. extra(+) is to convert poductPrice from string to number
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart); //callback to call once when got the products
      }
    });
  }
};

//constructor allows us to create a new cart object and when this cart is added, so it should have a property of products and we didnt want for every new product that we have a new cart and itself is not really an object we constantly re-create but there always be a single cart which we managed products in that throughout the application

//lets say, we assume that each product object that get stored in there is not just a product object having data in our product model but also have an extra quantity field

//totalPrice will always rise by the price of product we added. and we dont have product price in here though so we expect productPrice as an argument
