// const res = require('express/lib/response');
// const Product = require('../models/product');

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     //we remove the add-product file and copy all that code to edit-product.ejs
//     pageTitle: 'Add Product',
//     path: '/admin/add-product', //path is for the highlighting the certain navigation item
//     editing: false, //because we are not editing mode but add a product page so we are here to manage add-product and edit-product page combine, so it should be given
//   });
// };

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   const product = new Product(null, title, imageUrl, description, price); //null because we just add in the additional argument in the constructor as an id and if this will fail, else block will run and new product created mode which is what we want.
//   product.save();
//   res.redirect('/');
// };

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit; //it have a boolean value of true and false
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   //to pre-populate form with product data, we need to fetch product first where we get our product information .Means which product should going to edit, we need that product information..And for this, we need productId which get from incoming request because in the route, we have productId in the dynamic segment so by that name, we get the productId so we get id from URL.

//   Product.findById(prodId, (product) => {
//     if (!product) {
//       return res.redirect('/');
//     } //if we dont have a product
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       editing: editMode,
//       product: product, //product is what we recieve that was retrieved.
//     }); //we assume that we always have here having product and lets get product in the view now.
//   });
// }; //we always check query params in the controllers because it didnt effect route means it didnt effect this route *('/edit-product/:productId')*

// exports.postEditProduct = (req, res,next=> {
//   const prodId= req.body.productId
//   const updatedTitle= req.body.title
//   const updatedPrice=req.body.price
//   const updatedImageUrl=req.body.imageUrl
//   const updatedDesc= req.body.description
//   const updatedProduct= new Product(prodId, updatedTitle, updatedPrice, updatedImageUrl,updatedDesc)
//   //since, this is post request, i expect to get information in the req body.

//   updatedProduct.save()
//   res.redirect('/admin/products')

// });//we can store product id in the input field and we can extract that id by that name in the upcoming request in my controller. so request.body.productId

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render('admin/products', {
//       prods: products,
//       pageTitle: 'Admin Products',
//       path: '/admin/products',
//     });
//   });
// };
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

exports.postDeleteProduct = (req,res,next)=>{
  const prodId= req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')

}
