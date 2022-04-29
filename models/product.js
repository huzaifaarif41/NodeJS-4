const fs = require('fs');
const path = require('path');
const Cart= require('../models/cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}; //this function here to get and read whole file of data which is products.json.

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  //we made a contructor because we need to create a new object on every new Product.

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this; //this inside of the class is the updated product because you have to imagine that I create a new product instance. I will populate it with information about my existing product and then I just call save and I will find out that I already have this product and therefore I just replace it in the array which stored in the file with newly created product I am in.

        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product= products.find(prod=> prod.id===id)
      const updatedProducts = products.filter((prod) => prod.id !== id); //those products should be kept in the array 
      fs.writeFile(p, JSON.stringify(updatedProducts),err=>{
        if(!err){
          Cart.deleteProduct(id, product.price)
          
        }
      })
      
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
      //this will find on every element in the array and return that element for which this function is pass returns true.
      // (p => p.id===id) means that specific product id is equals to that id which we pass an an argument.
    });
  } //cb is a callback function which we will executed once we are done finding the product.
};
//save is a predefined function which javascript offers
// fetchAll and findById is a function which we made and their names totally upon us
