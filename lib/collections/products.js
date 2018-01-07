Products = new Mongo.Collection('products');

Products.allow({
  insert: function() { return true },
  update: function() { return true },
  remove: function() { return true }
});

validateProduct = function (product) {
  var errors = {};

  if (!product.name)
    errors.name = "Please fill in a name";
  
  if (!product.price)
    errors.price =  "Please fill in a price";

  return errors;
}


Meteor.methods({
  productInsert: function(productAttributes) {
    check(productAttributes, {
      name: String,
      price: String,
      discription: String
    });
    
    var errors = validateProduct(productAttributes);
    if (errors.name || errors.price)
      throw new Meteor.Error('invalid-product', "You must set a name and price for your product");
    
    var productWithSameName = Products.findOne({name: productAttributes.name});
    if (productWithSameName) {
      return {
        productExists: true,
        _id: productWithSameName._id
      }
    }
    
    var productId = Products.insert(productAttributes);
    
    return {
      _id: productId
    };
  }
  
});