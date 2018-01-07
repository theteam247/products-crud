Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

ProductsListController = RouteController.extend({
  template: 'productsList',
  waitOn: function() { return Meteor.subscribe('products'); },
  data: function() { return Products.find(); }
});

Router.route('/products/:_id', {
  name: 'productPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleProduct', this.params._id)
    ];
  },
  data: function() { return Products.findOne(this.params._id); }
});

Router.route('/products/:_id/edit', {
  name: 'productEdit',
  waitOn: function() { 
    return Meteor.subscribe('singleProduct', this.params._id);
  },
  data: function() { return Products.findOne(this.params._id); }
});


Router.route('/', function () {
  this.render('productsList');
});

Router.route('/new', {name: 'productNew'});

Router.onBeforeAction('dataNotFound', {only: 'productPage'});
