Meteor.publish('products', function(options) {
  check(options, {
    limit: Number
  });
  return Products.find({}, options);
});

Meteor.publish('singleProduct', function(id) {
  check(id, String);
  return Products.find(id);
});


// Meteor.publish('products', function() {
//   return Products.find();
// });